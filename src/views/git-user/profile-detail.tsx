import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Get } from '../../components/request/request';
import { User } from '../../types/user';
import { Button, Card, Col, Container, Form, Image, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { Repository } from '../../types/repository';
import { VirtualList } from '../../components/virtual-list/virtual-list';
import './css/profile-style.css';
import { ListUtil } from '../../utils/list-utils';
import moment from 'moment';
import Loader from '../loader/loader';

type RenderRowProps = {
  repository: Repository;
  onClick: (repository: Repository) => void;
}

function renderProfileInfo(text?: string, textValue?: string | number, icon?: string): ReactElement {
  const iconClass = `text-muted ${icon}`;
  return (
    <ListGroup.Item className="mt-2">
      <Container>
        <Row className="align-content-end">
          <Col xs="1">
            <h4><i className={iconClass} /></h4>
          </Col>
          <Col xs="10">
            <p className="text-muted">{text} {textValue}</p>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  )
}

function renderRow(props: RenderRowProps): ReactNode {
  const { repository, onClick } = props;
  return (
    <Card>
      <Card.Body>
        <Container fluid>

          <Row>
            <Col xs="12" md="10">
              <div className="d-flex cursor-pointer" onClick={() => onClick(repository)}>
                <div className="d-flex me-3 text-muted">
                  <i className="bi bi-git" />
                </div>
                <h6 className="text-muted">{repository.name}</h6>
              </div>
            </Col>
            <Col xs="2"></Col>
          </Row>

          <Row>
            <Col xs="12">
              <div className="d-flex card-text-limit text-muted">
                <p><small>{repository.description}</small></p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs="6" sm="2" className="align-content-end">
              <div className="d-flex">
                <div className="background-star-text"> <p><small><i className="bi bi-star"></i> Stars</small></p>  </div>
                <div className="background-star"> <p><small>{repository.stargazers_count}</small></p></div>
              </div>
            </Col>
            <Col xs="6" sm="10">
              <div className="text-muted"><small>Created at: {moment(repository.created_at).format('L')}</small></div>
              <small className="text-muted">Update at: {moment(repository.updated_at).format('L')}</small>
            </Col>
          </Row>

        </Container>
      </Card.Body >
    </Card >
  )
}

function ProfileDetail() {
  const navigate = useNavigate();
  const { userName } = useParams();
  const [user, setUser] = useState<User>();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [originalList, setOrinalList] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    loadProfile();
    loadRepositories();
  }, [])

  function loadProfile(): void {
    Get<User>(`https://api.github.com/users/${userName}`)
      .then(data => setUser(data));
  }

  function loadRepositories(): void {
    Get<Repository[]>(`https://api.github.com/users/${userName}/repos`)
      .then(data => {
        const repoOrdened = ListUtil.orderBy<Repository>(data, 'stargazers_count', false);
        setRepositories(repoOrdened);
        setOrinalList(repoOrdened);
        setLoading(false);
      });
  }

  function orderByStar(isAsk: boolean): void {
    const repositoryOrder = ListUtil.orderBy<Repository>(repositories, 'stargazers_count', isAsk);
    setRepositories([...repositoryOrder]);
  }

  function handleSearchItems(): void {
    if (searchValue !== '') {
      const repositoriesSearch = ListUtil.search<Repository>(originalList, 'name', searchValue);
      setRepositories([...repositoriesSearch]);
      return;
    }

    setRepositories([...originalList]);
  }

  function handleRepositoryClick(repository: Repository): void {
    const { full_name } = repository;
    navigate(`/repository/${full_name}`);
  }

  return (
    <>
      {loading ? <Loader /> :

        <Container className="mt-2" fluid>
          <Row>
            <Col xs="12" md="4" xl="3" className="justify-content-center">
              <Card>
                <Card.Body className="d-flex flex-column align-items-center">
                  <Image src={user?.avatar_url} roundedCircle height={200} />
                  <h4 className="text-muted pt-3">{user?.name}</h4>
                  <p className="text-muted"><small>{user?.bio}</small></p>
                </Card.Body>
              </Card>
              <Card className="mt-4">
                <ListGroup variant="flush">
                  {renderProfileInfo('Email: ', user?.email, 'bi bi-envelope')}
                  {renderProfileInfo('Followers: ', user?.followers, 'bi bi-person-raised-hand')}
                  {renderProfileInfo('Following: ', user?.following, 'bi bi-person-walking')}
                  {renderProfileInfo('Location: ', user?.location, 'bi bi-pin-map')}
                  {renderProfileInfo('Site: ', user?.blog, 'bi bi-globe')}
                  {renderProfileInfo('Twitter: ', user?.twitter_username, 'bi bi-twitter-x')}
                  {renderProfileInfo('User: ', user?.login, 'bi bi-github')}
                </ListGroup>
              </Card>
            </Col>

            <Col xs="12" md="8" xl="9">
              <div className="pb-2">
                <Row>
                  <Col xs="12" md="3" className="justify-content-start">
                    <h5 className="text-muted"><i className="bi bi-filter"> Filter  </i></h5>
                  </Col>
                  <Col xs="12" md="3">
                    <div className="d-flex pe-4 align-items-top">
                      <div className="me-2">
                        <span className="text-muted"><small>Order by star</small></span>
                      </div>
                      <h4 className="pe-2 text-muted cursor-pointer" onClick={() => orderByStar(true)}><i className="bi bi-sort-down">  </i></h4>
                      <h4 className="text-muted cursor-pointer" onClick={() => orderByStar(false)}><i className="bi bi-sort-up">   </i></h4>
                    </div>
                  </Col>
                  <Col xs="12" md="6" className="justify-content-">
                    <div className="d-flex ">
                      <InputGroup className="pe-1">
                        <Form.Control
                          placeholder="Repository Name"
                          aria-label="Repository Name"
                          aria-describedby="basic-addon1"
                          onChange={(event) => setSearchValue(event.target.value)}
                        />
                      </InputGroup>
                      <Button variant="outline-secondary" className="w-50" onClick={(handleSearchItems)}> <i className="bi bi-search"></i> Search</Button>
                    </div>
                  </Col>
                </Row>

              </div>
              <VirtualList
                list={repositories}
                estimateSize={180}
                width={'100%'}
                height={'700px'}
                overflow={'auto'}
                renderRow={(repository) => renderRow({ repository, onClick: handleRepositoryClick })} />
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}

export default ProfileDetail;