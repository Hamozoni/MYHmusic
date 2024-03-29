import TopNav from "../../Components/TopNav/TopNav";
import "./Chart.scss";
import ChartCarts from "../../Components/ChartCarts/ChartCarts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import {shazamData4 }from "../../Utils/Fetch";
import Error from "../../Components/Error/Error";

const Chart = ()=> {

    const {country, id } = useParams();

    const [chartsData,setChartsData] = useState([]);
    const [isLoading,setIsloading] = useState(false);
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState("");


    useEffect(()=> {
            setIsloading(true);
            setIsError(false);
            setChartsData([]);
            shazamData4(`charts/track?listId=${id}`)
            .then((data)=> {
                    const trackData = data.data.tracks
                    for(let i = 0; i <  trackData.length; i++){
    
                        setChartsData((prev)=>{
                            return [...prev,
                            {
                                artestImg: trackData[i]?.images?.background,
                                artestName: trackData[i]?.subtitle,
                                songTitle: trackData[i]?.title,
                                audioSrc  : trackData[i]?.hub?.actions ? trackData[i]?.hub?.actions[1]?.uri : "unknown",
                                artists: trackData[i]?.artists ? trackData[i]?.artists[0]?.adamid : "unknown",
                                songKey: trackData[i]?.key
                            }]
                        })
                }
                setIsloading(false)
                
            })
            .catch((error)=>{
                setIsError(true);
                setError(error);
            });
    },[id]);

    return (
        isError ? <Error error={error} /> :
        <div className="chart-p">
            <TopNav data={ chartsData } />
            {
                isLoading ? <Loading /> :
                ( 
                   <div className="container">
                       <ChartCarts title={`the must track in ${country}`} data={chartsData} pFrom={"chart"}/>
                    </div>
                )
                
            }
        </div>
    );
};

export default Chart;