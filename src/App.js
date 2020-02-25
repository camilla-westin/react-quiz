import React from 'react';
import data from './data/data';
import Answers from './components/Answers';
import Popup from './components/Popup';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nr: 0,
            total: data.length,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            question: data[0].question,
            answers: [
                data[0].answers[0], 
                data[0].answers[1], 
                data[0].answers[2], 
                data[0].answers[3]
            ],
            correct: data[0].correct
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        
    }

    pushData(nr) {
        console.log('pushdata');

        this.setState({
            question: data[nr].question,
            answers: [data[nr].answers[0], data[nr].answers[1], data[nr].answers[2], data[nr].answers[3] ],
            correct: data[nr].correct,
            nr: this.state.nr + 1
        });
    }

    nextQuestion() {
        let { nr, total} = this.state;
        console.log('nextQuestion');

        if(nr === total){
            this.setState({
                displayPopup: 'flex'
            });
        } else {
            this.pushData(nr);
            this.setState({
                showButton: false,
                questionAnswered: false,
            });
        }      
    }

    handleShowButton() {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
            nr: 1
        });
    }

    handleIncreaseScore() {
        this.setState({
            score: this.state.score + 1
        });
    }

    render() {
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score} = this.state;

        return (
            <div className="container">
                <h1>Quiz</h1>

                <Popup style={{display: displayPopup}} score={score} total={total} startQuiz={this.handleStartQuiz}/>

                <div className="row">
                    <div className="main">                     
                        <h2 class="question">{question}</h2>

                        <Answers answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}/>
                        <div id="submit">
                            {showButton ? <button className="fancy-btn" onClick={this.nextQuestion} >{nr===total ? 'SlutfÃ¶r quiz' : 'NÃ¤sta frÃ¥ga'}</button> : null}
                        </div>

                        <h3 class="question-total">FrÃ¥ga {nr}/{total}</h3>
                    </div>
                </div>
            </div>
        );
    }
};

export default App;
