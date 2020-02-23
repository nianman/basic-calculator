import React from "react";
import "./styles.css";

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: [],
            inputOne: "",
            inputTwo: "",
            action: "",
            answer: ""
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.clearHandler = this.clearHandler.bind(this);
        this.actionHandler = this.actionHandler.bind(this);
        this.equalHandler = this.equalHandler.bind(this);
        this.reverseHandler = this.reverseHandler.bind(this);
        this.floatHandler = this.floatHandler.bind(this);
    }
    clickHandler(e, item) {
        let dummy = item;

        if (this.state.number[0] == 0 && this.state.number.length == 1) {
            this.setState({ number: [dummy] });
        } else if (
            this.state.number.includes("-") &&
            dummy == 0 &&
            this.state.number.length == 1
        ) {
            console.log('is zero')
        } else {
            this.setState({ number: [...this.state.number, dummy] });
        }
    }
    reverseHandler() {

        if (!this.state.number.includes("-")) {
            this.setState({
                number: [..."-", ...this.state.number]
            });
        } else {
            let unreversed = this.state.number.filter(item => item != "-");
            this.setState({
                number: unreversed
            });
        }
    }
    clearHandler() {
        this.setState({
            number: [],
            inputOne: "",
            inputTwo: "",
            action: "",
            answer: ""
        });
    }
    actionHandler(e, item) {
        if (this.state.inputOne.length === 0) {
            let firstInput = this.state.number.join("");
            this.setState({ number: [], inputOne: firstInput, action: item });
        } else {
            let secondInput = this.state.number.join("");
            this.setState({ inputTwo: secondInput, action: item });
        }
    }
    equalHandler() {
        let ans = 0;
        let first = this.state.inputOne;
        let second = this.state.number.join("");
        if (this.state.action === "+") {
            ans = parseFloat(first) + parseFloat(second);
        } else if (this.state.action === "-") {
            ans = parseFloat(first) - parseFloat(second);
        } else if (this.state.action === "*") {
            ans = parseFloat(first) * parseFloat(second);
        } else if (this.state.action === "/") {
            if (second != 0) {
                ans = parseFloat(first) / parseFloat(second);
            } else {
                ans = "It is forbidden to divide by zero!";
            }
        }
        this.setState({ number: [],
            inputOne: "",
            inputTwo: "",
            action: "",
            answer: ans });
    }
    floatHandler() {
        if (this.state.number.length == 0) {
            this.setState({ number: ["0", "."] });
        } else if (this.state.number.includes(".")) {
            console.log("already is used");
        } else {
            this.setState({ number: [...this.state.number, "."] });
        }
    }
    render() {
        let array = [];
        let actions = ["+", "-", "*", "/"];
        for (let i = 0; i <= 9; i++) {
            array.push(i);
        }

        return (
            <div>
                <h1 className='sector__header'>Calculator</h1>

                <div className="sector sector__item">Your input: {this.state.number}</div>

                <div className="sector">
                    {array.map(item => {
                        return (
                            <p
                                className="sector__item"
                                key={item}
                                onClick={e => this.clickHandler(e, item)}
                            >
                                {item}
                            </p>
                        );
                    })}
                </div>
                <div className="sector flex">
                    {actions.map((item, key) => {
                        return (
                            <p
                                key={key}
                                className="sector__item"
                                onClick={e => this.actionHandler(e, item)}
                            >
                                {item}
                            </p>
                        );
                    })}
                    <div className="sector__item" onClick={this.floatHandler}>
                        ,
                    </div>
                    <div className="sector__item" onClick={this.reverseHandler}>
                        Reverse
                    </div>
                    <div className="sector__item clear" onClick={this.clearHandler}>
                        Clear
                    </div>
                    <div className="sector__item clear" onClick={this.equalHandler}>
                        =
                    </div>
                </div>


                <div className="sector__item answer">
                    And the answer is: <br/><span className='answer__number'>{this.state.answer}</span>
                </div>
            </div>
        );
    }
}