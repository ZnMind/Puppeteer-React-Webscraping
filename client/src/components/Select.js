import React, { useState } from 'react';
import Select from 'react-select';
import Scraper from './Scraper';

const options = [
    { value: "2022 Summer", label: "2022 Summer" },
    { value: "2022 Spring", label: "2022 Spring" },
    { value: "2021 Summer", label: "2021 Summer" },
    { value: "2021 Spring", label: "2021 Spring" },
    { value: "2020 Summer", label: "2020 Summer" },
    { value: "2020 Spring", label: "2020 Spring" },
    { value: "2019 Summer", label: "2019 Summer" },
    { value: "2019 Spring", label: "2019 Spring" },
    { value: "2018 Summer", label: "2018 Summer" },
    { value: "2018 Spring", label: "2018 Spring" }
    /* { value: "2017 Summer", label: "2017 Summer" },
    { value: "2017 Spring", label: "2017 Spring" },
    { value: "2016 Summer", label: "2016 Summer" },
    { value: "2016 Spring", label: "2016 Spring" },
    { value: "2015 Summer", label: "2015 Summer" },
    { value: "2015 Spring", label: "2015 Spring" } */
]

const MyComponent = () => {
    const [split, setSplit] = useState(options[0].value);
    const [url, setUrl] = useState(`https://lol.fandom.com/wiki/LCS/${options[0].value.split(' ')[0]}_Season/${options[0].value.split(' ')[1]}_Season`)

    const handleSplit = event => {
        setSplit(event.value);
        var lcs;
        event.value.split(' ')[0] >= 2019 
            ? lcs = "LCS" 
            : lcs = "NA_LCS"
        setUrl(`https://lol.fandom.com/wiki/${lcs}/${event.value.split(' ')[0]}_Season/${event.value.split(' ')[1]}_Season`)
    }

    return (
        <div>
            <Select
                defaultValue={options[0]}
                onChange={handleSplit}
                name='split'
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                />
            <a href={url} target="_blank" rel='noreferrer'>{`${split} Split`}</a>
            
            <Scraper 
                split={split}
                url={url}
            />
        </div>
    )
}

export default MyComponent;