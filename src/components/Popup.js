import React from "react";

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: "start",
      title: "Quiz",
      text:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      buttonText: "Starta quiz"
    };

    this.popupHandle = this.popupHandle.bind(this);
  }

  popupHandle() {
    let { time } = this.state;

    if (time === "start") {
      this.props.startQuiz();
    } else {
      window.location.reload(); // restart the application
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.score !== prevProps.score) {
      this.setState({
        title: "Grattis!",
        text:
          "Du har slutfÃ¶rt vÃ¥rt quiz. <br /> Du hade <strong>" +
          this.props.score +
          "</strong> av <strong>" +
          this.props.total +
          "</strong> frÃ¥gor rÃ¤tt.",
        buttonText: "GÃ¶r om quiz"
      });
    }
  }

  createMarkup(text) {
    return { __html: text };
  }

  render() {
    let { title, text, buttonText } = this.state;

    let { style } = this.props;

    return (
      <div className="popup-container" style={style}>
        <div className="container">
          <div className="col-md-8 col-md-offset-2">
            <div className="popup">
              <h1>{title}</h1>
              <p dangerouslySetInnerHTML={this.createMarkup(text)} />
              <button className="fancy-btn" onClick={this.popupHandle}>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
