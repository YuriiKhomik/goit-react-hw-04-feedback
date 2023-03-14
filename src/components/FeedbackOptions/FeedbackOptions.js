import PropTypes from 'prop-types';
import { firstLetterCapitalizer } from 'utils';

const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  return options.map(option => {
    return (
      <button
        key={option}
        type="button"
        name={option}
        onClick={onLeaveFeedback}
      >
        {firstLetterCapitalizer(option)}
      </button>
    );
  });
};

export default FeedbackOptions;

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};
