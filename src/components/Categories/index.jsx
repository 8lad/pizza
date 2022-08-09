function Categories({ value, onClickCategory }) {


    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

    return (<div className="categories">
        <ul>
            {categories.length && categories.map((item, index) => (<li key={item} onClick={() => { onClickCategory(index); }} className={value === index ? "active" : ""}>{item}</li>))}
        </ul>
    </div>);
}

export default Categories;