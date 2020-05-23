import { parse } from '@babel/parser';
import generate from '@babel/generator';
import * as t from 'babel-types';
import traverse from '@babel/traverse';
import template from 'babel-template';
import * as Comlink from 'comlink';

const Print = (...params) => {
  console.log(params);
};

const astWork = {
  stackInfo: [],
  paramsInfo: [],
  setStack(status, funcName, params) {
    const stringifyParams = {};
    Object.keys(params).forEach(value => {
      stringifyParams[value] = JSON.stringify(params[value]);
    });
    const node = {
      status,
      funcName,
      ...stringifyParams,
    };
    this.stackInfo.push(node);
    if (this.paramsInfo.length === 0) {
      this.paramsInfo = Object.keys(params);
    }
  },
  exeCode(code) {
    this.stackInfo = [];
    this.paramsInfo = [];
    let error = null;
    try {
      let res = eval(code);
      console.log(res);
    } catch (err) {
      this.stackInfo = [];
      error = err;
    }
    return { stack: this.stackInfo, params: this.paramsInfo, error };
  },
  getFuncNames(code) {
    const funcNames = [];
    let error = null;
    try {
      const ast = parse(code);
      traverse(ast, {
        Function(path) {
          funcNames.push(path.node.id.name);
        },
      });
    } catch (err) {
      error = err;
    }
    return { funcNames, error };
  },
  getTransform(code, target) {
    let transCode = '';
    let error = null;
    try {
      const buildEnter = template(
        'astWork.setStack("enter", FUNC_NAME, PARAMS)'
      );
      const buildLeave = template(
        'astWork.setStack("leave", FUNC_NAME, PARAMS)'
      );
      const ast = parse(code);
      const myVisitor = {
        Function(path) {
          console.log(path);
          const lastNode = path.node.body.body.length;
          if (path.node.id.name !== target) {
            return;
          }
          const funcName = target;
          // use params node create object properties array
          const paramsNode = path.node.params.map(value =>
            t.objectProperty(t.identifier(value.name), t.identifier(value.name))
          );
          path.get('body.body.0').insertBefore(
            buildEnter({
              FUNC_NAME: t.stringLiteral(funcName),
              PARAMS: t.objectExpression(paramsNode),
            })
          );
          // build Leave in every return statement.
          path.get('body').traverse(
            {
              ReturnStatement(path) {
                path.insertBefore(
                  buildLeave({
                    FUNC_NAME: t.stringLiteral(this.funcName),
                    PARAMS: t.objectExpression(this.paramsNode),
                  })
                );
              },
            },
            { funcName, paramsNode }
          );
          // build leave in code end.
          path.get(`body.body.${lastNode}`).insertAfter(
            buildLeave({
              FUNC_NAME: t.stringLiteral(funcName),
              PARAMS: t.objectExpression(paramsNode),
            })
          );
        },
      };
      traverse(ast, myVisitor);
      transCode = generate(ast).code;
    } catch (err) {
      error = err;
      console.log(err);
    }
    return { transCode, error };
  },
};

Comlink.expose(astWork);
