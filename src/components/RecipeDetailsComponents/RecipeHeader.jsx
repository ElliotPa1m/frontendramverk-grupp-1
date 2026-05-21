// this displays the recipe title, cuisine and category
function RecipeHeader({name, cuisine, category}) {
    return (
        <div>
            <h1 className="barlow-condensed-regular text-3xl text-text mb-4">
                {name}
            </h1>

            <div className="flex gap-2">
                <span className="barlow-condensed-light bg-pop text-white px-3 py-1 rounded-full text-sm">
                    {cuisine}
                </span>
                <span className="barlow-condensed-light bg-pop text-white px-3 py-1 rounded-full text-sm">
                    {category}
                </span>
            </div>
        </div>
    );
}

export default RecipeHeader;