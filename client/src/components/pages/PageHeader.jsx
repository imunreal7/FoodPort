const PageHeader = (props) => {
    return (
        <>
            <div className=" h-40 w-full bg-gradient-to-t from-lime-100 via-lime-200 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-lime-600 capitalize text-center lg:text-lef">
                    {props.title}
                </h2>
            </div>
        </>
    );
};

export default PageHeader;

