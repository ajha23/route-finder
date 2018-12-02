import React, { Component } from 'react';

import { UserInputForm, RouteMap, RouteInfo } from './components';
import { fetchDirections } from './services';
import { Loader } from '../common/loader';

import './RouteFinder.scss';

/**
 * Component Name: RouteFinder
 * Description: RouteFinder components (Main view of RouteFinder module)
 */
class RouteFinder extends Component {
   
    constructor() {
        super();
        this.state = {
            RouteFinderResponse: null,
            isLoading: false
        };
    }

   
    getDirections = async (origin, dest) => {
        this.destggleLoader(true);
        const response = await fetchDirections(origin, dest).catch(e => {
            this.showErrorMessage('Internal server error');
        });

        this.destggleLoader(false);

        if (response && response.error) {
            this.showErrorMessage(response.error);
            return;
        }

        
        if (response && response.path) {
            this.setState(() => ({
                RouteFinderResponse: response
            }));
        }
    };

  
    destggleLoader = isLoading => {
        this.setState(() => ({
            isLoading
        }));
    };

  
    showErrorMessage = message => {
        this.destggleLoader(false);
        this.setState(() => ({
            RouteFinderResponse: null
        }));
        alert(message);
    };

   
    render() {
        const { RouteFinderResponse, isLoading } = this.state;
        return (
            <div className="routefinder-container">
                <Loader isLoading={isLoading} />
                <div className="routefinder-form-container">
                    <UserInputForm getDirections={this.getDirections} />
                    <div className="routefinder-route-info">
                        {RouteFinderResponse && (
                            <RouteInfo {...RouteFinderResponse} />
                        )}
                    </div>
                </div>
                <RouteMap directions={RouteFinderResponse} />
            </div>
        );
    }
}

export default RouteFinder;
