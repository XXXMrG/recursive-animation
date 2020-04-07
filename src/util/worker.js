import { parse } from '@babel/parser';
import generate from '@babel/generator';
import * as t from 'babel-types';
import traverse from '@babel/traverse';
import template from 'babel-template';
import * as Comlink from 'comlink';

const astWork = {
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
      const buildEnter = template('myClg("enter ", FUNC_NAME, PARAMS)');
      const buildLeave = template('myClg("leave ", FUNC_NAME, PARAMS)');
      const ast = parse(code);
      const myVisitor = {
        Function(path) {
          if (path.node.id.name !== target) {
            return;
          }
          const funcName = target;
          const paramsNode = path.node.params;
          path.get('body.body.0').insertBefore(
            buildEnter({
              FUNC_NAME: t.stringLiteral(funcName),
              PARAMS: paramsNode,
            })
          );
          path.get('body').traverse(
            {
              ReturnStatement(path) {
                path.insertBefore(
                  buildLeave({
                    FUNC_NAME: t.stringLiteral(this.funcName),
                    PARAMS: this.paramsNode,
                  })
                );
              },
            },
            { funcName, paramsNode }
          );
        },
      };
      traverse(ast, myVisitor);
      transCode = generate(ast).code;
    } catch (err) {
      error = err;
    }
    return { transCode, error };
  },
};

Comlink.expose(astWork);
