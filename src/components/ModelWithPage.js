import { Modal } from '@zeit-ui/react';
import { useState, useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';

const ModelWithPage = props => {
  const { open, onClose, pages, title, subTitle } = props;
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState({ prev: false, next: true });

  useEffect(() => {
    setStatus({
      prev: current === 0 ? true : false,
      next: current === pages.length - 1 ? true : false,
    });
  }, [current]);
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Subtitle>{subTitle}</Modal.Subtitle>
      <Modal.Content>
        <div style={{ width: '1024px', height: '450px' }}>
          <AnimatePresence>{pages[current]}</AnimatePresence>
        </div>
      </Modal.Content>
      {pages.length > 1 && (
        <Modal.Action
          disabled={status.prev}
          onClick={() => setCurrent(prevCurrent => prevCurrent - 1)}
        >
          上一个
        </Modal.Action>
      )}
      {pages.length > 1 && (
        <Modal.Action
          disabled={status.next}
          onClick={() => setCurrent(prevCurrent => prevCurrent + 1)}
        >
          下一个
        </Modal.Action>
      )}
    </Modal>
  );
};

ModelWithPage.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default ModelWithPage;
