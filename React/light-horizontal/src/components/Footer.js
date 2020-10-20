import React, { Component } from 'react';

/**
 * Renders the Footer
 */
class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            2016 - 2019 &copy; Adminto theme by <a href="https://coderthemes.com">Coderthemes</a>
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-right footer-links d-none d-sm-block">
                                <a href="https://coderthemes.com">About Us</a>
                                <a href="https://coderthemes.com">Help</a>
                                <a href="https://coderthemes.com">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;