import React, { Component } from "react";
import PropTypes from "prop-types";
import reactCSS from 'reactcss';
import { CirclePicker } from "react-color";
import { Popover } from "@shopify/polaris";

class InputColorPickerRound extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        placeholder: PropTypes.string,
        colors: PropTypes.array,
        value: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func
    };
    state = {
        active: false,
        inputColor: this.props.value,
        checkColorError: false,
        colors: [
            '#0084ff',
            '#44bec7',
            '#ffc300',
            '#fa3c4c',
            '#d696bb',
            '#6699cc',
            '#13cf13',
            '#ff7e29',
            '#e68585',
            '#7646ff',
            '#20cef5',
            '#67b868',
            '#d4a88c',
            '#ff5ca1',
            '#a695c7',
            '#D4C4FB',
            '#006611',
            '#0033dd',
            '#f9f9f9',
            '#e1e2e1',
            '#000000'
        ]
    };

    handleChange = color => {
        this.setState({ inputColor: color.hex });
        const name = this.props.name;
        this.props.onChange(color.hex, name);
    };

    togglePopover = () => {
        this.setState(({ active }) => {
            return { active: !active };
        });
    };
    changeColorFacebook = e => {
        const matchColors = /^#([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})$/;
        const matchHEX = matchColors.exec(e.target.value);
        const value = e.target.value;
        const name = this.props.name;
        if (value.length < 8) {
            this.setState({ inputColor: value });
            if (matchHEX != null && value.length === 7 && value.toLowerCase() !== this.props.except) {
                this.props.onChange(value, name);
                this.setState({ inputColor: value, checkColorError: false });
            } else {
                this.setState({
                    checkColorError: true
                });
            }
        }
    };
    focusColor = () => {
        const value = this.state.inputColor;
        const matchColors = /^#([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})$/;
        const matchHEX = matchColors.exec(value);
        if (value.length < 7 || matchHEX === null || value.toLowerCase() === this.props.except) {
            this.setState({
                checkColorError: true
            });
        }
        return false;
    };
    checkColor = () => {
        this.setState({
            checkColorError: false
        });
    };

    render() {
        const styles = reactCSS({
            default: {
                color: {
                    float: 'right',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '1px solid #e9e9e9',
                    background: this.props.value,
                    marginTop: '2px'
                },
                swatch: {
                    float: 'left',
                    width: '100%',
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    display: 'inline-block',
                    cursor: 'pointer',
                    border: '0.1rem solid #c4cdd5',
                    borderRadius: '3px'
                },
                hex: {
                    float: 'left',
                    width: '50px',
                    color: '#90949c'
                },
                popover: {
                    position: 'relative',
                    zIndex: '2'
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px'
                },
                width100: {
                    width: '100%'
                },
                label: {
                    fontSize: '1.4rem',
                    marginBottom: '0.9rem'
                },
                input: {
                    width: '100%',
                    marginLeft: '1px',
                },

            }
        });

        const activator = (
            <div style={styles.swatch} onClick={this.togglePopover}>
                <div style={styles.hex}>{this.props.value}</div>
                <div style={styles.color} />
            </div>
        );
        return (
            <div className="color-picker-round">
                <div style={styles.label}>
                    {this.props.label}
                </div>
                <Popover
                    active={this.state.active}
                    activator={activator}
                    onClose={this.togglePopover}
                >
                    <Popover.Pane fixed>
                        <Popover.Section>
                            <label style={styles.width100}>
                                <input
                                    value={this.state.inputColor}
                                    onChange={this.changeColorFacebook}
                                    style={{ display: 'none' }}
                                />
                                <input
                                    value={this.state.inputColor}
                                    onChange={this.changeColorFacebook}
                                    onFocus={this.focusColor}
                                    onBlur={this.checkColor}
                                    style={styles.input}
                                />
                            </label>
                            {(() => {
                                if (this.state.checkColorError) {
                                    return (
                                        <div className="check-color-error">
                                            <i className="drop-down-color-error" />
                                            <span>
                                                Please provide a hexidecimal color code with a leading
                                                    number sign(e.g #0084FF){this.props.except ? ', except white' : ''}
                                            </span>
                                        </div>
                                    );
                                }
                            })()}
                        </Popover.Section>
                    </Popover.Pane>
                    <Popover.Pane>
                        {this.state.active ? (
                            <div style={styles.popover}>
                                <CirclePicker
                                    colors={this.state.colors}
                                    color={this.state.inputColor}
                                    onChange={this.handleChange}
                                />
                            </div>
                        ) : null}
                    </Popover.Pane>
                </Popover>
            </div>
        );
    }
}

export default InputColorPickerRound;
