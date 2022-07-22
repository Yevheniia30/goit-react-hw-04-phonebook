import PropTypes from 'prop-types';
import s from './ContactList.module.css';

export const ContactItem = ({ item, onDelete }) => {
  return (
    <li className={s.item}>
      <b className={s.name}>{item.name}</b>
      <span>{item.number}</span>
      <button className={s.btn} onClick={() => onDelete(item.id)}>
        Delete contact
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
};
