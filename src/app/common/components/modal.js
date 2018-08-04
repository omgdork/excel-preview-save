import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ title, children, isShown, btnCancel, btnConfirm }) => (
  <div className={['modal', isShown ? 'shown' : ''].join(' ')}>
    <div className="modal-container">
      <h3>{title}</h3>
      <section className="body">
        {children}
      </section>
      <footer>
        {btnConfirm && (<button onClick={btnConfirm.onClick} className="btn btn-confirm">{btnConfirm.text}</button>)}
        <button onClick={btnCancel.onClick} className="btn btn-cancel">{btnCancel.text}</button>
      </footer>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  btnCancel: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  btnConfirm: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  title: PropTypes.string,
};

Modal.defaultProps = {
  title: 'Modal',
  isShown: false,
  btnConfirm: null,
};

export default Modal;
