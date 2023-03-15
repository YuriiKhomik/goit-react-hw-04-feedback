import React, { useReducer } from 'react';
import { percentageCounter } from 'utils';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';

// // VIA USEREDUCER

const feedbackState = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function feedbackReducer(state, action) {
  switch (action.type) {
    case 'good':
      return { ...state, good: state.good + action.payload };
    case 'neutral':
      return { ...state, neutral: state.neutral + action.payload };
    case 'bad':
      return { ...state, bad: state.bad + action.payload };

    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useReducer(feedbackReducer, feedbackState);

  const options = Object.keys(state);
  const { good, neutral, bad } = state;
  const total = good + neutral + bad;
  const positivePercentage = percentageCounter(total, good);

  const handleClick = e => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'good':
        dispatch({ type: 'good', payload: 1 });
        break;

      case 'neutral':
        dispatch({ type: 'neutral', payload: 1 });
        break;

      case 'bad':
        dispatch({ type: 'bad', payload: 1 });
        break;

      default:
        return;
    }
  };

  return (
    <div
      style={{
        paddingTop: '100px',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleClick} />
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}

// // VIA USESTATE

// function App() {
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);

//   const options = ['good', 'neutral', 'bad'];
//   const total = good + neutral + bad;
//   const positivePercentage = percentageCounter(total, good);

//   const handleClick = e => {
//     const { name } = e.currentTarget;

//     switch (name) {
//       case 'good':
//         setGood(prevState => prevState + 1);
//         break;

//       case 'neutral':
//         setNeutral(prevState => prevState + 1);
//         break;

//       case 'bad':
//         setBad(prevState => prevState + 1);
//         break;

//       default:
//         return;
//     }
//   };

//   return (
//     <div
//       style={{
//         paddingTop: '100px',
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//         fontSize: 20,
//         color: '#010101',
//       }}
//     >
//       <Section title="Please leave feedback">
//         <FeedbackOptions options={options} onLeaveFeedback={handleClick} />
//         {total > 0 ? (
//           <Statistics
//             good={good}
//             neutral={neutral}
//             bad={bad}
//             total={total}
//             positivePercentage={positivePercentage}
//           />
//         ) : (
//           <Notification message="There is no feedback" />
//         )}
//       </Section>
//     </div>
//   );
// }

// // VIA CLASS-CPMPONENT

// class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   handleClick = e => {
//     const { name } = e.currentTarget;
//     this.setState(prevState => {
//       return {
//         [name]: prevState[name] + 1,
//       };
//     });
//   };

//   countTotalFeedback = allFeedbacks => {
//     return Object.values(allFeedbacks).reduce((acc, value) => {
//       return acc + value;
//     }, 0);
//   };

//   countPositiveFeedbackPercentage = (total, percent) => {
//     if (total > 0) {
//       const purePercent = (percent * 100) / total;
//       const roundedNumber = Math.round(purePercent);
//       return roundedNumber;
//     }
//     return 0;
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const total = this.countTotalFeedback(this.state);
//     const positivePercentage = this.countPositiveFeedbackPercentage(
//       total,
//       good
//     );
//     const options = Object.keys(this.state);
//     return (
//       <div
//         style={{
//           paddingTop: '100px',
//           height: '100vh',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'flex-start',
//           fontSize: 20,
//           color: '#010101',
//         }}
//       >
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={options}
//             onLeaveFeedback={this.handleClick}
//           />
//           {total > 0 ? (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             />
//           ) : (
//             <Notification message="There is no feedback" />
//           )}
//         </Section>
//       </div>
//     );
//   }
// }

export default App;
