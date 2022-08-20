import style from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => (
  <div className={style.root}>
    <h1>
      <span>😕</span>
      Ничего не найдено
    </h1>
    <p> К сожалению, информация которую Вы искали недоступна или не существует</p>
  </div>
);

export default NotFoundBlock;
