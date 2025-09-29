import "./ProjectDelails.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faDownload,
  faLink,
  faArrowAltCircleLeft,
  faUserShield,
  faFileAlt,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Locale } from "../../../../i18n-config";

type Project = {
  id: string;
  nameProject: string;
  slug: string;
  title: string;
  descProject: string;
  imgProject: string[];
  videoProject?: string;
  infoProject?: string;
  visitSites?: string;
  codeSource?: string;
  downloadAPK?: string;
  urlProject?: string[];
  urlSITE?: string[];
  apk?: string;
  usedTools?: string;
  tools?: string[];
  technologies?: {
    Développement: string[];
    DevOps: string[];
  };
  description?: {
    title: string;
    points: string[];
  };
  devopsProcess?: {
    title: string;
    steps: string[];
  };
  utilisation?: {
    title: string;
    url: string;
    login: string;
    password: string;
  };
  rapport?: {
    url: string;
    label: string;
  };
};

type Props = {
  ItemsProject: Project;
  lang: Locale;
  backToHome: string;
};

const ProjectDetails: React.FC<Props> = ({ ItemsProject, lang, backToHome }) => {
  const project = ItemsProject;

  return (
    <div className="project-details p-xl-5 p-2">
      <div className="project-details-contain d-block m-auto">
        {/* Header */}
        <div className="row mb-3">
          <div className="col-lg-2 col-12">
            <Link
              href={`/${lang}#${backToHome}`}
              className="project-details-contain-backHome"
            >
              <FontAwesomeIcon
                className="project-details-contain-backHome-icon"
                icon={faArrowAltCircleLeft}
              />
            </Link>
          </div>
          <div className="col-lg-10 col-12 text-lg-end text-center project-details-title position-relative">
            <h4>{project.nameProject}</h4>
          </div>
        </div>

        {/* Main Preview */}
        <div className="row">
          {project.imgProject?.[0] && (
            <div
              className={project.videoProject ? "col-xl-8 col-12" : "col-12"}
            >
              <Image
                src={`/Images/${project.imgProject[0]}.png`}
                alt={project.imgProject[0]}
                title={project.imgProject[0]}
                height={512}
                width={1512}
              />
            </div>
          )}

          {project.videoProject && (
            <div
              className={
                project.imgProject?.length > 0
                  ? "col-xl-4 col-12 py-xl-0 py-3"
                  : "col-12"
              }
            >
              <video width="100%" height="300px" controls loop autoPlay muted>
                <source
                  src={`/${project.videoProject}.mp4`}
                  type="video/mp4"
                />
              </video>
            </div>
          )}
        </div>

        {/* Description / Info */}
        <div className="row mt-4">
          <div className="col-xl-7">
            {project.infoProject && (
              <h5 className="position-relative">{project.infoProject}</h5>
            )}
            <h6>{project.title}</h6>
            <p>{project.descProject}</p>

            {project.description?.points && (
              <>
                <h6>{project.description.title}</h6>
                <div>
                  {project.description.points.map((point, i) => (
                    <p key={i}>✔ {point}</p>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Technologies / Tools */}
          <div className="col-xl-5">
            {project.usedTools && (
              <>
                <h5 className="position-relative">{project.usedTools}</h5>

                {!project.technologies && (
                  <div className="row">
                    {project.tools?.map((tool, i) => (
                      <div className="col-xl-3 col-4" key={i}>
                        <Image
                          src={`/Images/Icons/${tool}.png`}
                          alt={tool}
                          title={tool}
                          height={100}
                          width={100}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {project.technologies && (
                  <>
                    <h6 className="pt-2">{project?.technologies?.title}</h6>
                    <div className="row">
                      {project?.technologies?.Développement?.map((tech, i) => (
                        <div className="col-xl-3 col-4" key={i}>
                          <Image
                            src={`/Images/Icons/${tech}.png`}
                            alt={tech}
                            title={tech}
                            height={100}
                            width={100}
                          />
                        </div>
                      ))}
                    </div>

                    <h6 className="pt-2">DevOps</h6>
                    <div className="row">
                      {project.technologies.DevOps.map((tech, i) => (
                        <div className="col-xl-3 col-4" key={i}>
                          <Image
                            src={`/Images/Icons/${tech}.png`}
                            alt={tech}
                            title={tech}
                            height={100}
                            width={100}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* DevOps Process */}
        {project.devopsProcess?.steps && (
          <div className="mt-4">
            <h5 className="position-relative">
              <FontAwesomeIcon
                icon={faServer}
                className="me-2"
                style={{ width: 20 }}
              />
              {project.devopsProcess.title}
            </h5>
            <div>
              {project.devopsProcess.steps.map((step, i) => (
                <p key={i}>⚙ {step}</p>
              ))}
            </div>
          </div>
        )}

        {/* Utilisation */}
        {project.utilisation && (
          <div className="mt-4">
            <h5 className="position-relative">
              <FontAwesomeIcon
                icon={faUserShield}
                className="me-2"
                style={{ width: 20 }}
              />
              {project.utilisation.title}
            </h5>
            <p>
              <strong>URL :</strong>{" "}
              <Link href={project.utilisation.url} target="_blank">
                {project.utilisation.url}
              </Link>
            </p>
            <p>
              <strong>Login :</strong> {project.utilisation.login}
            </p>
            <p>
              <strong>Mot de passe :</strong> {project.utilisation.password}
            </p>
          </div>
        )}

        {/* Rapport */}
        {project.rapport?.url && (
          <div className="mt-4">
            <Link
              href={project.rapport.url}
              className="btn btn-success"
              download
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                style={{ width: 20 }}
                className="me-2"
              />
              {project.rapport.label}
            </Link>
          </div>
        )}

        {/* Links Section */}
        <div className="row justify-content-center mt-4">
          {project.urlSITE?.[0] && (
            <div className="col-md-6">
              <Link
                href={project.urlSITE[0]}
                className="project-details-url"
                target="_blank"
              >
                <p className="text-center">
                  <FontAwesomeIcon
                    className="project-details-link"
                    icon={faLink}
                  />
                  {project.visitSites}
                </p>
              </Link>
            </div>
          )}

          {project.apk && (
            <div className="col-md-6">
              <Link
                className="project-details-url"
                href={`/${project.apk}.apk`}
                download={`${project.nameProject}.apk`}
              >
                <p className="text-center">
                  <FontAwesomeIcon
                    className="project-details-link"
                    icon={faDownload}
                  />
                  {project.downloadAPK}
                </p>
              </Link>
            </div>
          )}

          {project.urlProject?.[0] && (
            <div className="col-md-6">
              <Link
                className="project-details-url"
                href={project.urlProject[0]}
                target="_blank"
              >
                <p className="text-center">
                  <FontAwesomeIcon
                    className="project-details-link"
                    icon={faCode}
                  />
                  {project.codeSource}
                </p>
              </Link>
            </div>
          )}
        </div>

        {/* Other Images */}
        {project.imgProject?.length > 1 && (
          <div className="row mt-3">
            {project.imgProject.slice(1).map((item, index) => (
              <div key={index} className="col-lg-4 p-2">
                <Image
                  src={`/Images/${item}.png`}
                  alt={item}
                  title={item}
                  height={512}
                  width={1512}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
