import React, { useState } from "react";
import Pagination from "./Pagination";

const Scraper = props => {
    const [data, setData] = useState({})
    const [scraped, setScraped] = useState(false)
    const [load, setLoad] = useState("")
    var newArr = [];

    const getScrape = () => {
        setLoad("Loading...")
        fetch(`/scrape?value=${props.url}`)
            .then(res => res.json())
            .then(body => {
                setData(body)
                setScraped(true)
                console.log(body)
                console.log(Object.keys(body).length)
            })
    }

    var valArr = Object.values(data)
    for (let i = 0; i < valArr.length; i++) {
        newArr.push(Object.values(valArr[i]))
        //setData([...data, Object.values(valArr[i])])
    }

    const Button = ({ text, onClick, className }) => {
        return <button onClick={onClick}>{text}</button>
    }

    return (
        <div>
            {/* `${props.split} & ${props.url}` */}
            <div>
                <Button
                    text="Scrape"
                    onClick={getScrape}
                    className="btn btn-primary"
                />
            </div>
            {scraped 
            ? <Pagination 
                data={newArr}
            /> 
            : load}
        </div>
    )
}

export default Scraper;