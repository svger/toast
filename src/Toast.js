import styles from "./style/index.less";
import React, { PropTypes, Component } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
const defaultPrefixCls = "cefc-toast";

class Message extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false
    };
    this.prepareClose(props);
  }

  componentDidMount() {
    this.handleOpen();
    window.addEventListener("scroll", this.handleTouchEvent);
    // window.addEventListener('click', this.handleTouchEvent);
  }

  componentWillReceiveProps(nextProps) {
    "open" in nextProps && this.setState({ open: nextProps.open }); //// in 可以用用来判断 json 里面有没有某个属性
    this.prepareClose(nextProps);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleTouchEvent);
    // window.removeEventListener('click', this.handleScroll);
  }

  prepareClose(props) {
    const { duration } = props;
    duration && setTimeout(this.handleClose, duration * 1000);
  }

  handleTouchEvent = () => {
    let { open } = this.state;

    if (open) {
      this.setState({ open: false });
      this.props.onClose && this.props.onClose();
    }
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose && this.props.onClose();
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { type, message, duration } = this.props;
    const { open } = this.state;
    let opacity = open ? "0.5" : "0";

    return <div className={classnames(defaultPrefixCls, {
          [`${defaultPrefixCls}--${type}`]: type
        })} style={{ opacity: opacity }}>
        {message}
        {duration === 0 && <button className={`${defaultPrefixCls}__remove`} onClick={this.handleClose}>
            Show Toast
          </button>}
      </div>;
  }
}

Message.propTypes = {
  type: PropTypes.oneOf(["success", "danger"]).isRequired,
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  prefixCls: PropTypes.string
};

let render = props => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  let isOpen = false;
  const messageQueue = [];
  const handleClose = () => {
    isOpen = false;
    const head = messageQueue[0] && messageQueue.shift();
    head && render(head);
  };

  render = nextProps => {
    props = Object.assign({}, props, nextProps);
    if (isOpen && props.open) {
      return messageQueue.push(props);
    }
    isOpen = props.open;
    ReactDOM.render(<Message {...props} onClose={handleClose} />, container);
    props.open || handleClose();
  };
  render();
};

const message = {
  /**
   * @public
   * @name message.success
   * @param  {string | element} message message 内容，支持 React 元素
   * @param  {number} [duration] 持续时间，单位秒，为0时手动关闭
   * @description 成功信息，默认 2 秒后自动关闭
   */
  success(message, duration = 2) {
    render({
      message,
      duration,
      type: "success",
      open: true
    });
  },

  /**
   * @public
   * @name message.danger
   * @param  {string | element} message message 内容，支持 React 元素
   * @param  {number} [duration] 持续时间，单位秒，为0时手动关闭
   * @description 失败信息，默认 3 秒后自动关闭
   */
  danger(message, duration = 3) {
    render({
      message,
      duration,
      type: "danger",
      open: true
    });
  },

  /**
   * @public
   * @name message.close
   * @description 关闭当前 message
   */
  close() {
    render({ open: false });
  }
};

export default message;
