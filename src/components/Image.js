export const Image = ({ selectedTree }) => {
    return (
            <img
                src={selectedTree.image_url}
                alt={selectedTree.object_name}
                width="600px"
                height="auto"
                className="w-full sm:max-w-lg mx-auto border-[8px] border-black opacity-75"
            />
    );
}
