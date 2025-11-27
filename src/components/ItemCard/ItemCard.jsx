import "./ItemCard.css";
import likeButton from "../../assets/likeButton.png";
import unLikeButton from "../../assets/unLikeButton.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({
      id: item._id,
      isLiked: item.isLiked,
    });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {/* LIKE / UNLIKE BUTTON */}
        <button className="like-button" onClick={handleLike}>
          <img
            src={item.isLiked ? likeButton : unLikeButton}
            alt={item.isLiked ? "Unlike" : "Like"}
            className="like-button__image"
          />
        </button>
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
