import React from "react";
import { Link } from "react-router-dom";
import NaverMap, {Marker, Polygon} from "react-naver-map-fork";

class NewPol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pol: "",
            markers:[],
            polygons:[],
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
        const url = "/api/v2/showpols/index";
        const { pol } = this.state;
        // console.log(pol.split(','));

        if (pol.length == 0)
            return;

        const body = {
            pol: pol // replace(/\n/g, "")
            // pol: pol.replace(/\n/g, "").split(','),
        };
        console.log(body);

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
                return response.json();
            }
            throw new Error("Network response was not ok.");
        }).then(response => {
            this.props.history.push(`/polshow`);
            console.log(response);

            const tmPoList = [];
            response.forEach((el)=>{
                // console.log(el.pol);
                if (el.pol.indexOf('POLYGON')!==-1) {
                    const tmPaths = [];
                    el.pol.replace('POLYGON','').split('),(').forEach((path)=>{
                        const tmPath = [];
                        path.replace(/\(/g,'').replace(/\)/g,'').split(',').forEach((point)=>{
                            // console.log(point);
                            const [lng, lat] = point.split(' ');
                            tmPath.push({lat:lat, lng:lng});
                        });
                        tmPaths.push(tmPath);
                    });
                    tmPoList.push(
                        <Polygon 
                            key = {el.pnu}
                            paths={tmPaths} 
                            fillColor={'#ff0000'}
                            fillOpacity={0.6}
                            strokeColor={'#ff0000'}
                            strokeOpacity={0.6}
                            strokeWeight={2}
                        />
                    );
                }
            });
            this.setState({polygons: tmPoList});

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
                pol: this.makeGeom(newPaths)
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
        this.setState({markers: tmpMarkers, paths: [tmpPolygon], pol: this.makeGeom([tmpPolygon])});
        document.getElementById('pol').value = this.makeGeom([tmpPolygon]);

    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <form onSubmit={this.onSubmit}>
                            <label htmlFor="pol">pnu 입력(여러 개일 경우 ',' 로 구분)</label>
                                <textarea
                                    className="form-control"
                                    id="pol"
                                    name="pol"
                                    rows="5"
                                    required
                                    onChange={this.onChange}
                                />
                            <button type="submit" className="btn custom-button mt-3">show polygon</button>
                            <Link to="/" className="btn btn-link mt-3">Back</Link>
                        </form>
                    </div>
                    <NaverMap
                        clientId='uu18yh1r2p'
                        ncp // 네이버 클라우드 플랫폼 사용여부
                        style={{margin:'0 auto',width:'100%', height:'900px'}}
                        initialPosition={{lat:37.5063796431181, lng:127.06221589110937}}
                        initialZoom={16}
                        // onMapClick={(e) => {this.createPolygon(e)}}
                        jijuk={true}
                    >
                        {this.state.polygons}
                    </NaverMap>
                </div>
            </div>
        );
    }
}

export default NewPol;