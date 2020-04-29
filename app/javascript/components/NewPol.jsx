import React from "react";
import { Link } from "react-router-dom";
import NaverMap, {Marker, Polygon} from "react-naver-map-fork";

class NewPol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pol: "",
            name: "",
            table: "",
            markers:[],
            polygon:[],
            paths:[[]]
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    stripHtmlEntities(str) {
        return String(str)
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const url = "/api/pols/polstest/create";
        const { pol, name, table } = this.state;
        console.log(pol);

        if (pol.length == 0 || name.length == 0 || table.length == 0)
            return;

        const body = {
            pol: pol.replace(/\n/g, ""),
            name,
            table
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        console.log(token);
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => {
            if (response.ok) {
                console.log('ok')
                return response.json();
            }
            throw new Error("Network response was not ok.");
        }).then(response => {
            this.props.history.push(`/pol`);
            console.log(response);
            this.setState({
                pol: "",
                name: "",
                table: "",
                markers:[],
                paths:[[]],
                polygon:[]
            });
            document.getElementById('pol').value = ''
            document.getElementById('zoneName').value = ''
            document.getElementById('tableName').value = ''
        }).catch(error => {
            console.log(error.message);
        });
    }

 
    createPolygon(e) {
        // console.log(e.latlng.x, e.latlng.y);
        const lng = e.latlng.x;
        const lat = e.latlng.y;
        // console.log(this.state.markers);
        const key = String(this.state.markers.length)+'-'+String(lng)+'-'+String(lat);
        const newPaths = [this.state.paths[0].concat([{lng:lng, lat:lat}])];
        this.setState(
            {
                markers: this.state.markers.slice().concat([
                    <Marker 
                        key={key}
                        lng={lng}
                        lat={lat}
                        onClick={()=>this.removePoint(key)}  // id: given id, event: PointerEvent 
                    />
                ]),
                paths: newPaths,
                pol: this.makeGeom(newPaths),
                polygon: [
                    <Polygon 
                        key={key}
                        paths={newPaths} 
                        fillColor={'#ff0000'}
                        fillOpacity={0.6}
                        strokeColor={'#ff0000'}
                        strokeOpacity={0.6}
                        strokeWeight={2}
                    />
                ]
            }
        );
        document.getElementById('pol').value = this.makeGeom(newPaths);
    }

    makeGeom(paths) {
        let s = 'POLYGON((';
        paths[0].forEach(el => {
            s += String(el.lng)+' '+String(el.lat)+','
        });
        s += paths[0][0].lng+' '+paths[0][0].lat+'))'
        return s
    }

    removePoint(key) {
        const tmpMarkers = [];
        const tmpPolygon = [];
        this.state.markers.forEach((marker)=>{
            if (marker.key!==key) {
                tmpMarkers.push(marker);
                tmpPolygon.push({lng:marker.props.lng, lat:marker.props.lat});
            }
        });
        this.setState({markers: tmpMarkers, paths: [tmpPolygon], pol: this.makeGeom([tmpPolygon]), polygon:[
            <Polygon 
                key={key}
                paths={[tmpPolygon]} 
                fillColor={'#ff0000'}
                fillOpacity={0.6}
                strokeColor={'#ff0000'}
                strokeOpacity={0.6}
                strokeWeight={2}
            />

        ]});
        document.getElementById('pol').value = this.makeGeom([tmpPolygon]);

    }

    render() {
        return (
            <div className="container mt-5">
                <NaverMap
                    clientId='uu18yh1r2p'
                    ncp // 네이버 클라우드 플랫폼 사용여부
                    style={{margin:'0 auto',width:'100%', height:'900px'}}
                    initialPosition={{lat:37.5063796431181, lng:127.06221589110937}}
                    initialZoom={16}
                    onMapClick={(e) => {this.createPolygon(e)}}
                    jijuk={true}
                >
                    {this.state.markers}
                    {this.state.polygon}
                    {/* <Polygon 
                        paths={this.state.paths} 
                        fillColor={'#ff0000'}
                        fillOpacity={0.6}
                        strokeColor={'#ff0000'}
                        strokeOpacity={0.6}
                        strokeWeight={2}
                    /> */}
                </NaverMap>

              <div className="row">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="zoneName">table</label>
                    <input
                      type="text"
                      name="table"
                      id="tableName"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zoneName">name</label>
                    <input
                      type="text"
                      name="name"
                      id="zoneName"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                  <label htmlFor="pol">polygon</label>
                  <textarea
                    className="form-control"
                    id="pol"
                    name="pol"
                    rows="5"
                    required
                    onChange={this.onChange}
                  />
                  <button type="submit" className="btn custom-button mt-3">
                    save polygon
                  </button>
                  <Link to="/polstest" className="btn btn-link mt-3">
                    Back
                  </Link>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default NewPol;