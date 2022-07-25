import { useState } from "react";

function Categories() {

    const [activeIndex, setActiveIndex] = useState(0);
    const onClickCategory = (index) => {
        setActiveIndex(index);
    };
    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

    return (<div className="categories">
        <ul>
            {categories.length && categories.map((item, index) => (<li key={item} onClick={() => { onClickCategory(index); }} className={activeIndex === index ? "active" : ""}>{item}</li>))}
        </ul>
    </div>);
}

export default Categories;