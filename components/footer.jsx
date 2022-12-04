'use client';

import { Container, Row } from 'react-bootstrap';
import useSWR from 'swr';
import Fetcher from '@teko/helpers/fetcher';

const Team = () => {
  const teamsFetcher = new Fetcher('data?q=team');
  const { data, error } = useSWR(teamsFetcher.url, teamsFetcher.fetcher, teamsFetcher.swrConfig);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    data.map((member) => (
      <p key={member.name} className="sm:mb-1">
        <a href={member.linkedin} className="text-white no-underline">
          {' '}
          {member.name}
        </a>
      </p>
    ))
  );
};

function TekoFooter() {
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
              <Team />
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

export default TekoFooter;
