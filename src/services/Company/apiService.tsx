import { api } from '../api'
import {
  CompanyCreateRequest,
  CompanyResponse,
  CompanyResponsePaginate,
  CompanyUpdateRequest
} from './types'

export const getAllCompanies = (page: number, size?: number) =>
  api.get<CompanyResponsePaginate>('/empresas', { params: { page, size } })

export const getAllCustomers = () =>
  api.get<CompanyResponsePaginate>('/empresas?relacao=clientes')

export const getAllSuppliers = () =>
  api.get<CompanyResponsePaginate>('/empresas?relacao=fornecedores')

export const createCompany = (companyData: CompanyCreateRequest) =>
  api.post<CompanyResponse>('/empresas', companyData)

export const editCompany = (companyData: CompanyUpdateRequest, id: string) =>
  api.patch<CompanyResponse>(`/empresas/${id}`, companyData)

export const deleteCompany = (id: string) => api.delete(`/empresas/${id}`)

export const getCompanyById = (id: string) =>
  api.get<CompanyResponse>(`/empresas/${id}`)
