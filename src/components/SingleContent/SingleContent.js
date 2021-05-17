import { Badge } from "@material-ui/core";
// import { img_300, unavailable } from "../../config/config";
import requests from '../../service/requests';
import "./SingleContent.css";
// import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    // <ContentModal media_type={media_type} id={id}>
    // <div className="media">
    //   <Badge
    //     badgeContent={vote_average}
    //     color={vote_average > 6 ? "primary" : "secondary"}
    //   />
    //   <img
    //     className="poster1"
    //     src={poster ? `${requests.img_300}${poster}` : requests.unavailable}
    //     alt={title}
    //   />
    //   <b className="title">{title}</b>
    //   <span className="subTitle">
    //     {media_type === "tv" ? "TV Series" : "Movie"}
    //     <span className="subTitle">{date}</span>
    //   </span>
      
    // {/* </ContentModal> */}
    // </div>
    <div className="media">
    <Badge
        badgeContent={vote_average? vote_average:'NA'}
        color={vote_average > 6 ? "primary" : "secondary"}
      >
    <img
        className="poster1"
        src={poster ? `${requests.img_300}${poster}` : requests.unavailable}
        alt={title}
      />
      </Badge>
      <b className="title">{title}</b>
    </div>
  );
};

export default SingleContent;