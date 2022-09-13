import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../../css/search.css'
import Metadata from '../layout/Metadata';
const SearchPrpduct = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate(`/products`)
        }
    }

    return (
        <>
            <br />
            <Metadata title="Search Product"/>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <form className="card card-sm" onSubmit={submitHandler}>
                        <div className="card-body row no-gutters align-items-center">
                            <div className="col-auto">
                                <i className="fas fa-search h4 text-body"></i>
                            </div>

                            <div className="col">
                                <input className="form-control form-control-lg form-control-borderless" type="search" onChange={(e) => setKeyword(e.target.value)} placeholder="Search topics or keywords" />
                            </div>

                            <div className="col-auto">
                                <button className="btn btn-lg btn-success" type="submit">Search</button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default SearchPrpduct