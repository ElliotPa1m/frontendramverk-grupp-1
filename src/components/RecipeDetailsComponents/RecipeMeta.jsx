//this displays the category, area and tags from the API
function RecipeMeta({category, area, tags}) {

    // strTags can be null, this checks before splitting
    const tagList = tags ? tags.split(",").map((tag) => tag.trim()) : [];

    return (
        <div className="p-6 flex flex-wrap gap-4">
            <div className="flex flex-col">
                <span className="barlow-condensed-regular text-text text-lg">Category</span>
                <span className="barlow-condensed-light text-text">{category}</span>
            </div>

            <div className="flex flex-col">
                <span className="barlow-condensed-regular text-text text-lg">Area</span>
                <span className="barlow-condensed-light text-text">{area}</span>
            </div>

            {/* this only renders the tags section if there are any */}
            {tagList.length > 0 && (
                <div className="flex flex-col">
                    <span className="barlow-condensed-regular text-text text-lg">Tags</span>
                    <div className="flex gap-2 flex-wrap">
                        {tagList.map((tag) => (
                            <span key={tag} className="barlow-condensed-light bg-pop text-white px-3 py-1 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                 </div>
            )}
        </div>
    );
}

export default RecipeMeta;