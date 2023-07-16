import { Component } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = feedback => {
    this.setState(prevState => ({
      [feedback]: prevState[feedback] + 1,
    }));
    this.getTotalCount();
  };

  getTotalCount = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositivePercentage = () => {
    const { good } = this.state;
    const totalCount = this.getTotalCount();

    if (totalCount === 0) {
      return 0;
    }

    return Math.round((good * 100) / totalCount);
  };

  render() {
    const options = Object.keys(this.state);
    const totalCount = this.getTotalCount();

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {totalCount !== 0 ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              totalCount={this.getTotalCount()}
              positivePercentage={this.countPositivePercentage()}
            />
          ) : (
            <Notification message={'There is no feedback!'} />
          )}
        </Section>
      </>
    );
  }
}

export default App;
