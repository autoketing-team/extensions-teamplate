import React, { Component } from "react";
import PropTypes from "prop-types";
import reactCSS from 'reactcss';
import { GithubPicker } from "react-color";
import { TextField } from "@shopify/polaris";

class InputColorPicker extends Component {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    colors: PropTypes.array,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    colors: [
      "#B80000",
      "#DB3E00",
      "#FCCB00",
      "#008B02",
      "#006B76",
      "#1273DE",
      "#004DCF",
      "#5300EB",
      "#EB9694",
      "#FAD0C3",
      "#FEF3BD",
      "#C1E1C5",
      "#BEDADC",
      "#C4DEF6",
      "#BED3F3",
      "#D4C4FB",
      "#FFFFFF",
      "#EEEEEE"
    ]
  };

  state = {
    displayColorPicker: false,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1"
    },
    checkColor: "#F00"
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ color: color.rgb, value: this.props.dataColor });
    const name = this.props.name;
    this.props.onChange(color.hex, name);
  };
  handleChangeColor = value => {
    const name = this.props.name;
    if (value.length < 8) {
      this.props.onChange(value, name);
    }
  };
  checkColor = value => {
    const name = this.props.name;
    const matchColors = /^#([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})$/;
    const matchHEX = matchColors.exec(value.target.value);
    if (value.target.value.length < 8) {
      if (matchHEX != null) {
        this.props.onChange(value.target.value, name);
      } else {
        this.props.onChange(this.state.checkColor, name);
      }
    }
  };
  onInputFocus = value => {
    const matchColors = /^#([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})$/;
    const matchHEX = matchColors.exec(value.target.value);
    if (value.target.value.length < 8) {
      if (matchHEX != null) {
        this.setState({
          checkColor: value.target.value
        });
      }
    }
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "20px",
          height: "20px",
          borderRadius: "2px",
          background: this.props.value
        },
        swatch: {
          width: "20px",
          height: "20px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          cursor: "pointer",
          zIndex: 999,
          position: "absolute"
        },
        popover: {
          position: "absolute",
          zIndex: "999",
          top: "72px",
          right: 0
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });
    return (
      <div className="wrap-input-color-picker">
        <div className="wrap-input">
          <TextField
            label={this.props.label}
            value={this.props.value}
            onChange={this.handleChangeColor}
            onBlur={this.checkColor}
            onFocus={this.onInputFocus}
          />
        </div>
        <div className="wrap-picker-icon">
          <div className="swatch" style={styles.swatch} onClick={this.handleClick}>
            <div style={styles.color} />
          </div>
          {this.state.displayColorPicker ? (
            <div style={styles.popover} className="wrap-action-list">
              <div style={styles.cover} onClick={this.handleClose} />
              <GithubPicker
                color={this.state.color}
                onChange={this.handleChange}
                colors={this.props.colors}
                width="237px"
                triangle="top-right"
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default InputColorPicker;
