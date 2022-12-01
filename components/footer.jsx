'use client';

import { use } from 'react';

import { Container, Row } from 'react-bootstrap';
import { assetPrefix } from '@teko/next.config';

const getData = async (q) => {
  const res = await fetch(`${assetPrefix}/api/data?q=${q}`);
  const data = await res.json();
  return data;
};

function CustomFooter() {
  const team = use(getData('team'));
  return (
    <>
      <footer className="bg-brand text-white pt-5 pb-4 no-underline">
        <Container className="text-left">
          <Row className="text-left">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="uppercase mb-4 font-semibold text-xl sm:text-2xl md:font-bold md:text-3xl">
                    Teko
              </h5>
              <p>
                    Here you can use rows and columns to organize your footer
                    content. Lorem ipsum dolor sit amet, ital consectetur lorem
                    ipsum dolor sit amet adipisicing elit.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="uppercase mb-6 font-semibold md:text-xl">Pitur</h5>
              <p className="sm:mb-1">
                <a href="#" className="text-white no-underline ">
                  {' '}
                        TheProviders
                </a>
              </p>
              <p className="sm:mb-1">
                <a href="#" className="text-white no-underline">
                  {' '}
                        Creativity
                </a>
              </p>
              <p className="sm:mb-1">
                <a href="#" className="text-white no-underline">
                  {' '}
                        SourceFiles
                </a>
              </p>
              <p className="sm:mb-1">
                <a href="#" className="text-white no-underline">
                  {' '}
                        bootstrap 5 alpha
                </a>
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="uppercase mb-6 font-semibold md:text-xl">
                    Kontak
              </h5>
              {team.map((member) => (
                <p key={member.name} className="sm:mb-1">
                  <a href={member.linkedin} className="text-white no-underline">
                    {' '}
                    {member.name}
                  </a>
                </p>
              ))}
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="uppercase mb-6 font-semibold md:text-xl">
                    Alamat
              </h5>
              <p className="sm:mb-1">New York, NY 2333, US</p>
              <p className="sm:mb-1">theproviders98@gmail.com</p>
              <p className="sm:mb-1">+92 3162859445</p>
              <p className="sm:mb-1">+01 335 633 77</p>
            </div>
          </Row>
          <hr className="my-3" />
          <div className="text-center">
            <p> Copyright ©2022 All rights reserved | Teko</p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default CustomFooter;
