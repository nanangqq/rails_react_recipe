import React from "react";
import { Link } from "react-router-dom";

class Pols_test extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pols_test: []
        };
    }

    componentDidMount() {
        const url = "/api/pols/polstest/index";
        fetch(url).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        }).then(response => {
            console.log(response);
            this.setState({ pols_test: response });
        }).catch(()=>{
            this.props.history.push('/');
        });
    }

    render() {
        const { pols_test } = this.state;
        const allPols = pols_test.map((pol, index) => (
            <div key={index} className='col-md-6 col-lg-4'>
                <div className='card mb-4'>
                    <div className='card-body'>
                        <h5 className='card-title'>{pol.name}</h5>
                        <p>{pol.pol}</p>
                    </div>
                </div>
            </div>
        ));
        const noRecipe = (
            <div className='vw-100 vh-50 d-flex align-items-center justify-content-center'>
                <h4>
                    No recipes yet. Why not <Link to='/new_recipe'>create one</Link>!
                </h4>
            </div>
        );

        return (
            <>
                {/* <section className="jumbotron jumbotron-fluid text-center">
                    <div className="container py-5">
                        <h1 className="display-4">Recipes for every occasion</h1>
                        <p className="lead text-muted">
                            We've pulled together our most popular recipes, our latest
                            additions, and our editor's picks, so there's sure to be something
                            tempting for you to try.
                        </p>
                    </div>
                </section> */}
                <div className="py-5">
                    <main className="container">
                        <div className="text-right mb-3">
                            <Link to='/pol' className='btn custom-button'>
                                Create New Polygon
                            </Link>
                        </div>
                        <div className='row'>
                            {pols_test.length > 0? allPols: noRecipe}
                        </div>
                        <Link to='/' className='btn btn-link'>
                            Home
                        </Link>
                    </main>
                </div>
            </>
        );
    }
}

export default Pols_test;