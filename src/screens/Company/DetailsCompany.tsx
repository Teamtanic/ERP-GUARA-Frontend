import { Card } from "../../components/Card";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Navbar } from "../../components/Navbar";
import { Text } from "../../components/Text";
import { codeMask, formatPhoneNumber } from "../../utils";
import * as Tabs from "@radix-ui/react-tabs";
import { useLocation } from "react-router-dom";
import { CompanyResponse } from "../../services/Company/types";
import { CompanyModal } from "./CompanyModal";
import { PencilSimple, Trash } from "phosphor-react";
import { deleteCompany } from "../../services/Company/apiService";
import { CardDelete } from "../../components/CardDelete";
import { useEffect, useState } from "react";
import { getAllCompanyProjects } from "../../services/Project/apiService";
import { ProjectResponse } from "../../services/Project/type";
import { TableListProject } from "../Project/TableListProject";
import { ProductWarehouseResponse } from "../../services/ProductWarehouse/type";
import { getAllCompanyProducts } from "../../services/ProductWarehouse/apiService";
import { TableListProductWarehouse } from "../Warehouse/TableListProductWarehouse";
import { Loader } from "../../components/Loader";
import { TableListDocument } from "../Documents/TableListDocument";
import { getAllDocuments } from "../../services/Document/apiService";
import { DocumentResponse } from "../../services/Document/types";

export function DetailsCompany() {
  const location = useLocation();
  const [currentPage] = useState(1);
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [products, setProducts] = useState<ProductWarehouseResponse[]>([]);
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);

  const [projectLoading, setProjectLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [documentLoading, setDocumentLoading] = useState(false);

  const { state } = location;
  const company: CompanyResponse = state.record;

  company.contact.map((contact) => console.log(contact));

  useEffect(() => {
    (async () => {
      try {
        setProjectLoading(true);
        const { data: content } = await getAllCompanyProjects(
          company.name,
          currentPage - 1
        );
        setProjects(content.content);
      } catch (error) {
        console.error("Erro ao obter conteúdo do documento:", error);
      } finally {
        setProjectLoading(false);
      }
    })();
  }, [company.id, currentPage]);

  useEffect(() => {
    (async () => {
      try {
        setProductLoading(true);
        const { data: content } = await getAllCompanyProducts(
          company.id,
          currentPage - 1
        );
        setProducts(content.content);
      } catch (error) {
        console.error("Erro ao obter conteúdo do documento:", error);
      } finally {
        setProductLoading(false);
      }
    })();
  }, [company.id, currentPage]);

  useEffect(() => {
    (async () => {
      try {
        setDocumentLoading(true);
        const { data: content } = await getAllDocuments(
          `Empresas/${company.id}`
        );
        setDocuments(content);
      } catch (error) {
        console.error("Erro ao obter conteúdo do documento:", error);
      } finally {
        setDocumentLoading(false);
      }
    })();
  }, [company.id, currentPage]);

  const handleDelete = async (record: CompanyResponse) => {
    try {
      await deleteCompany(record.id);
      window.location.href = "/empresas";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Navbar />
      <div className="w-full flex py-6 p-24 max-md:p-6 flex-col">
        <div className="flex justify-between items-center">
          <Heading size="lg">{company.name}</Heading>
          <div className="flex gap-3 items-center">
            <CompanyModal
              optionsTrigger
              title="Edição de Empresa"
              action="Editar"
              iconTrigger={<PencilSimple size={16} weight="bold" />}
              triggerStyle="!w-fit !h-fit !bg-sky-500 hover:!bg-sky-300"
              mode="edit"
              data={company}
            />
            <CardDelete
              onDelete={() => handleDelete(company)}
              triggerStyle="!bg-red-700"
              iconTrigger={<Trash size={16} weight="bold" />}
            />
          </div>
        </div>
        <Card className="w-full !p-0">
          <div className="flex h-36 max-sm:flex-col max-sm:h-fit">
            <div className="flex flex-col md:w-4/5 p-4 justify-evenly">
              <div className="w-full flex items-center justify-between">
                <Text className="!text-gray-900 .contactfont-semibold">
                  {company.name}
                </Text>
                {company.companyRelationships.map((relation) => (
                  <Card
                    className={`${
                      relation.businessRelationship == "FORNECEDOR"
                        ? "!bg-blue-950 "
                        : "!bg-emerald-600"
                    } w-fit flex items-center justify-center md:hidden`}
                  >
                    <Text className="" size="xm">
                      {relation.businessRelationship}
                    </Text>
                  </Card>
                ))}
              </div>
              <Text className="!text-gray-500 font-semibold">
                {company.cpf
                  ? codeMask(company.cpf)
                  : company.cnpj
                  ? codeMask(company.cnpj)
                  : "Não informado"}
              </Text>
              <div className="flex gap-3">
                {company.companyRelationships.map((relation) => (
                  <Card
                    className={`${
                      relation.businessRelationship == "FORNECEDOR"
                        ? "!bg-blue-950 "
                        : "!bg-emerald-600"
                    } w-fit flex items-center justify-center max-sm:hidden`}
                  >
                    <Text className="!text-gray-100" size="xm">
                      {relation.businessRelationship}
                    </Text>
                  </Card>
                ))}
              </div>
            </div>
            <div className="bg-gray-300 w-full flex flex-col justify-evenly p-4">
              <div>
                <Text className="!text-gray-900 font-semibold">Telefone: </Text>
                <Text className="!text-gray-900">
                  {company.contact.map((contact, index) => (
                    <span key={index}>
                      {contact.telephone
                        ? formatPhoneNumber(contact.telephone)
                        : "Não informado"}
                      {index < company.contact.length - 1 ? " / " : ""}
                    </span>
                  ))}
                </Text>
              </div>
              <div>
                <Text className="!text-gray-900 font-semibold">Celular: </Text>
                <Text className="!text-gray-900">
                  {company.contact.map((contact, index) => (
                    <span key={index}>
                      {contact.cell_phone
                        ? formatPhoneNumber(contact.cell_phone)
                        : "Não informado"}
                      {index < company.contact.length - 1 ? " / " : ""}
                    </span>
                  ))}
                </Text>
              </div>
              <div>
                <Text className="!text-gray-900 font-semibold">Email: </Text>
                <Text className="!text-gray-900">
                  {company.contact.map((contact, index) => (
                    <span key={index}>
                      {contact.email ? contact.email : "Não informado"}
                    </span>
                  ))}
                </Text>
              </div>
            </div>
          </div>
        </Card>

        <Tabs.Root className="flex flex-col w-full mt-6" defaultValue="tab1">
          <Tabs.List
            className="shrink-0 flex border-b"
            aria-label="Dados da empresa"
          >
            <Tabs.Trigger
              className="bg-gray-100 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=inactive]:bg-gray-200 outline-none cursor-default"
              value="tab1"
            >
              Documentos
            </Tabs.Trigger>
            <Tabs.Trigger
              className="bg-gray-100 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=inactive]:bg-gray-200 outline-none cursor-default"
              value="tab2"
            >
              Projetos
            </Tabs.Trigger>
            <Tabs.Trigger
              className="bg-gray-100 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=inactive]:bg-gray-200 outline-none cursor-default"
              value="tab3"
            >
              Produtos
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            className="grow p-5 bg-gray-100 rounded-b-md outline-none "
            value="tab1"
          >
            {documentLoading ? (
              <Loader />
            ) : documents ? (
              <TableListDocument
                data={documents.filter(
                  (document) => document.nodeType === "cm:content"
                )}
              />
            ) : (
              ""
            )}
          </Tabs.Content>
          <Tabs.Content
            className="grow p-5 bg-gray-100 rounded-b-md outline-none "
            value="tab2"
          >
            {projectLoading ? (
              <Loader />
            ) : company ? (
              <TableListProject data={projects} />
            ) : (
              ""
            )}
          </Tabs.Content>
          <Tabs.Content
            className="grow p-5 bg-gray-100 rounded-b-md outline-none "
            value="tab3"
          >
            {productLoading ? (
              <Loader />
            ) : products ? (
              <TableListProductWarehouse data={products} />
            ) : (
              ""
            )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Container>
  );
}
