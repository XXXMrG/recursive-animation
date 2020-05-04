import React from 'react';
import { useRef, useEffect, useState } from 'react';
import Ace from 'ace-builds';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/webpack-resolver.js';
import './Ace.css';
import PropTypes from 'prop-types';

const AceComponent = props => {
  const Editor = useRef(null);
  const [aceInstance, setAceInstance] = useState(null);
  const { onChange, defaultValue, options, value, onError } = props;
  useEffect(() => {
    Ace.require('ace/ext/language_tools');
    setAceInstance(Ace.edit(Editor.current));
  }, []);

  useEffect(() => {
    if (aceInstance) {
      aceInstance.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        mode: 'ace/mode/javascript',
        theme: 'ace/theme/chaos',
        tabSize: 2,
        ...options,
      });
      defaultValue && aceInstance.setValue(defaultValue, 1);
      aceInstance.session.on('change', () => {
        onChange && onChange(aceInstance.getValue());
      });
      aceInstance.session.on('changeAnnotation', () => {
        onError &&
          onError(aceInstance.getValue(), aceInstance.session.getAnnotations());
      });
    }
  }, [aceInstance, options]);

  useEffect(() => {
    aceInstance && aceInstance.setValue(value, 1);
  }, [value]);

  return <div className="ace-editor" ref={Editor}></div>;
};

AceComponent.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  options: PropTypes.object,
  value: PropTypes.string,
  onError: PropTypes.func,
};

export default AceComponent;
