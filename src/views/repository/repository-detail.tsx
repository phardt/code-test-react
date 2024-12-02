import { ReactElement, useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { Get } from '../../components/request/request';
import { RepositoryDetail } from '../../types/repository-detail';
import moment from 'moment';
import Loader from '../loader/loader';

function renderAboutItems(icon: string, value?: string | number | boolean, text?: string): ReactElement {

  return (
    <div className="d-flex pb-3">
      <div className="pe-2 text-muted"><i className={icon} /> {value} {text} </div>
    </div>
  )
}

function RepositoryDetailView(): ReactElement {
  const navigate = useNavigate();
  const { user, repoName } = useParams();
  const [repository, setRepository] = useState<RepositoryDetail>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadRepositoryInfo();
  }, []);

  function loadRepositoryInfo() {
    Get<RepositoryDetail>(`https://api.github.com/repos/${user}/${repoName}`)
      .then(data => {
        setRepository(data);
        setLoading(false);
      });
  }

  function handleClickBackToRepositories(): void {
    navigate(`/profile-detail/${user}`)
  }

  return (
    <>
      {loading ? <Loader /> :
        <Container fluid className="mt-2 mb-2 layout-min-height">
          <Row>
            <Col xs="12" sm="8">
              <div className="d-flex align-items-center">
                <Image src={repository?.owner?.avatar_url} roundedCircle height={50} />
                <h6 className="text-muted ps-2">{repository?.name}</h6>
              </div>
            </Col>
            <Col xs="12" sm="4">
              <div className="d-flex justify-content-center pb-3">
                <div className="pe-2"><Badge bg="secondary" ><i className="bi bi-eye" /> watch {repository?.watchers}</Badge></div>
                <div className="pe-2"><Badge bg="secondary" ><i className="bi bi-star" /> star {repository?.stargazers_count}</Badge></div>
                <div><Badge bg="secondary" className="pe-2"><i className="bi bi-git" /> fork {repository?.forks ?? 0}</Badge></div>
              </div>
            </Col>
          </Row>
          <Row>
            <Container>
              <Row>
                <Col xs="12" sm="8" md="9">
                  <Row>
                    <Col xs="12">
                      <Card style={{ minHeight: '420px' }} className="mb-3">
                        <Card.Body>
                          <p className="text-muted">{repository?.description}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col xs="12" sm="4" md="3">
                  <h5 className="text-muted">About</h5>
                  {renderAboutItems('bi bi-star', repository?.stargazers_count, 'star')}
                  {renderAboutItems('bi bi-eye', repository?.watchers, 'watchers')}
                  {renderAboutItems('bi bi-git', repository?.forks, 'forks')}
                  {renderAboutItems('bi bi-people', repository?.private ? 'private' : 'public', '')}
                  {renderAboutItems('bi bi-arrow-90deg-down', repository?.fork ? 'is fork' : 'not fork', '')}
                  {renderAboutItems('bi bi-calendar3', moment(repository?.created_at).calendar(), 'created')}
                  {renderAboutItems('bi bi-calendar3', moment(repository?.updated_at).calendar(), 'last update')}
                  {renderAboutItems('bi bi-file-code', repository?.language, '')}
                  {renderAboutItems('bi bi-files', repository?.license.name, '')}
                  {renderAboutItems('bi bi-person-walking', repository?.subscribers_count, 'subscribers')}
                </Col>
              </Row>
            </Container>

            <Col xs="12">

            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <hr />
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <div className="d-flex">
                <Button variant="outline-dark" href={repository?.html_url}><i className="bi bi-github" /> Github repository</Button>
                <div className="d-flex ms-2">
                  <Button variant="outline-dark" onClick={handleClickBackToRepositories}><i className="bi bi-arrow-90deg-left" /> Back to Repositories</Button>
                </div>

              </div>
            </Col>
            <Col sm="6" className="justify-content-end">
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}

export default RepositoryDetailView;