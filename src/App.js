import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AddressField from './AddressField';
import {nextWednesday, AddressLink, nextSaturday} from './AddressLink';
import flow from 'lodash/fp/flow';

function PlaceLinks(props) {
    const places = props.places;
    const home = props.source;

    let infos = [];
    places.forEach(place => {
        if (place.target) {
            infos.push(<AddressLink key={place.key} source={home} title={place.title} target={place.target}
                                    time={place.time}/>);
        } else {
            infos.push(<AddressLink key={place.key} source={place.source} title={place.title} target={home}
                                    time={place.time}/>);

        }
    });
    return infos
}

const places = [
    {
        "key": "vaisala",
        "title": "Vaisala arkena 7:45",
        "target": {
            "address": "Vaisala Oyj",
            "coordinates": [24.87776, 60.281661]
        },
        "time": flow(nextWednesday, moment => moment.hour(7).minutes(45).seconds(0))
    },
    {
        "key": "destia",
        "title": "Destia arkena 7:45",
        "target": {
            "address": "Neilikkatie 17",
            "coordinates": [25.032171, 60.291209]
        },
        "time": flow(nextWednesday, moment => moment.hour(7).minutes(45).seconds(0))
    },
    {
        "key": "keskusta",
        "title": "Rautatieasema arkena 07:45",
        "target": {
            "address": "Rautatieasema",
            "coordinates": [24.941252,60.170356]
        },
        "time": flow(nextWednesday, moment => moment.hour(7).minutes(45).seconds(0))
    },
    {
        "key": "keskusta",
        "title": "Rautatieasema viikonloppuna 11:00",
        "target": {
            "address": "Rautatieasema",
            "coordinates": [24.941252,60.170356]
        },
        "time": flow(nextSaturday, moment => moment.hour(11).minutes(0).seconds(0))
    },
    {
        "key": "keskustasta",
        "title": "Rautatieasemalta viikonloppuna 23:00",
        "source": {
            "address": "Rautatieasema",
            "coordinates": [24.941252,60.170356]
        },
        "time": flow(nextSaturday, moment => moment.hour(23).minutes(0).seconds(0))
    },
    {
        "key": "keskustasta",
        "title": "Rautatieasemalta viikonloppuna 01:30",
        "source": {
            "address": "Rautatieasema",
            "coordinates": [24.941252,60.170356]
        },
        "time": flow(nextSaturday, moment => moment.hour(1).minutes(30).seconds(0))
    }
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "Osoite",
            places: places
        };

        this.onCoordinateReceived = this.onCoordinateReceived.bind(this)
        this.onAddressChange = this.onAddressChange.bind(this)
        this.fetchCoordinates = this.fetchCoordinates.bind(this)
    }

    onCoordinateReceived(coordinates) {
        this.setState({address: this.state.address, coordinates: coordinates});
    }

    onAddressChange(address) {
        this.setState({address: address, coordinates: null})
        this.fetchCoordinates(address)
    }

    fetchCoordinates(address) {
        const handler = this.onCoordinateReceived
        const target = `https://api.digitransit.fi/geocoding/v1/search?text=${address},%20Helsinki&size=1`
        fetch(target).then(response => {
            response.json().then(result => {
                console.log(result);
                handler(result.features[0].geometry.coordinates);
            });
            }
        ).catch(reason => console.log(reason))
    }

    render() {
        const source = {
            "coordinates": this.state.coordinates,
            "address": this.state.address
        };

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Asunnonhaku</h1>
                </header>
                <div className="App-paragraph">
                    <p>Syötä osoite</p>
                    <AddressField onAddressChange={this.onAddressChange}/>
                </div>
                <p>Klikkaa linkkiä</p>
                <PlaceLinks source={source} places={this.state.places} />
            </div>
        );
    }
}

export default App;
