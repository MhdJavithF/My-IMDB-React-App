import { useCallback, useEffect, useState } from "react";

const Pagination = ({change}) => {

    const totalPages = 47378;
    const maxVisiblePage = 10;
    const startPage = 1;

    const [pages, setPages] = useState([]);
    const [activePage, setActivePages] = useState(1);

    const getPage = useCallback((totalPages, maxVisiblePage, activePage) => {
        const resultPage = totalPages > maxVisiblePage ? maxVisiblePage : totalPages;
        const startPage = (activePage + resultPage) > totalPages ? totalPages - maxVisiblePage + 1 : activePage;
        return [...Array(resultPage)].map((_,idx) => {
            return startPage + idx;
        });
    },[]);

    const handlePage = useCallback((e) => {
        let selectedPage = 0;
        if(e.target.dataset.id === 'next'){
            selectedPage = activePage + 1;
        }
        else if(e.target.dataset.id === 'prev'){
            selectedPage = activePage - 1;
        }
        else{
            selectedPage = Number(e.target.dataset.id);
        }
        setActivePages(selectedPage);
        change(selectedPage);  
    },[activePage]);

    useEffect(() => {
        const newPages = getPage(totalPages, maxVisiblePage, activePage)
        setPages(newPages);
    },[activePage]);
    
    return(
        <div className="pagination">
            <button className="page" disabled={activePage === 1} data-id="prev" onClick={handlePage}>{"<<"}</button>
            {pages.map((page) => (
                <div className={`page ${activePage === page ? "active" : ""}`} data-id={page} onClick={handlePage}>
                    {page}
                </div>
            ))}
            <button className="page" disabled={activePage === totalPages} data-id="next" onClick={handlePage}>{">>"}</button>
        </div>
    )
}

export default Pagination;