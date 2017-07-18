import { GraphQLSchema } from 'graphql'; 


const typeDefinitions = `
type Query{
    items: [Item]
}

type Item{
    service_name: String
    cname: String
    creation_date: String
    type: String
    organization_guid: String
    account_id: String
    ctype: String
    provider: String
    scope: String
    modification_date: String
    name: String
    resource_id: String
    doc: Docs
    region: String
    service_instance: String
    family: String
    crn: String
}

type Docs{
    memory: Int
    production: Boolean
    instances: Int
    health_check_timeout:Int
    running_instances: Int
    detected_buildpack_guid: String
    buildpack: String
    detected_buildpack: String
    ports: Int
    available_domains: [Domain]
    routes: [Routes]
    guid: String
    enable_ssh: Boolean
    health_check_type: String
    staging_failed_description: String
    staging_task_id: String
    diego: Boolean
    state: String
    console: Boolean
    debug: String
    services: [Services]
    space_guid: String
    version: String
    command: String
    staging_failed_reason: String
    detected_start_command: String
    health_check_http_endpoint: String
    package_updated_at: String
    docker_credentials_json: DockerCredentials
    name: String
    guid: String
    disk_quota: Int
    stack_guid: String
    docker_image: String
}

type Domain{
    name: String
    router_group_type: String
    guid: String
    router_group_guid: String
}

type Routes{
    path: String
    port: Int
    domain: DomainInfo
    host: String
    guid: String
}

type DomainInfo{
    name: String
    guid: String
}

type Services{
    bound_app_count:Int
    service_plan: ServicePlan    
    name: String
    guid: String
    dashboard_url: String
    last_operation: LastOperation
}

type ServicePlan{
    service: Service
    name: String
    guid: String
}

type Service{
    provider: String
    guid: String
    label: String
    version: String
}

type LastOperation{
    updated_at: String
    description: String
    created_at: String
    state: String
    type: String
}

type DockerCredentials{
    redacted_message: String
}

input qryItem{
    items: [ItemInp]
}
input ItemInp{
    service_name: String
    cname: String
    creation_date: String
    type: String
    organization_guid: String
    account_id: String
    ctype: String
    provider: String
    scope: String
    modification_date: String
    name: String
    resource_id: String
    doc: DocsInp
    region: String
    service_instance: String
    family: String
    crn: String
}

input DocsInp{
    memory: Int
    production: String
    instances: Int
    health_check_timeout:Int
    running_instances: Int
    detected_buildpack_guid: String
    buildpack: String
    detected_buildpack: String
    ports: Int
    available_domains: [DomainInp]
    routes: [RoutesInp]
    guid: String
    enable_ssh: Boolean
    health_check_type: String
    staging_failed_description: String
    staging_task_id: String
    diego: Boolean
    state: String
    console: Boolean
    debug: String
    services: [ServicesInp]
    space_guid: String
    version: String
    command: String
    staging_failed_reason: String
    detected_start_command: String
    health_check_http_endpoint: String
    package_updated_at: String
    docker_credentials_json: DockerCredentialsInp
    name: String
    guid: String
    disk_quota: Int
    stack_guid: String
    docker_image: String
}

input DomainInp{
    name: String
    router_group_type: String
    guid: String
    router_group_guid: String
}

input RoutesInp{
    path: String
    port: Int
    domain: DomainInfoInp
    host: String
    guid: String
}

input DomainInfoInp{
    name: String
    guid: String
}

input ServicesInp{
    bound_app_count:Int
    service_plan: ServicePlanInp    
    name: String
    guid: String
    dashboard_url: String
    last_operation: LastOperationInp
}

input ServicePlanInp{
    service: ServiceInp
    name: String
    guid: String
}

input ServiceInp{
    provider: String
    guid: String
    label: String
    version: String
}

input LastOperationInp{
    updated_at: String
    description: String
    created_at: String
    state: String
    type: String
}

input DockerCredentialsInp{
    redacted_message: String
}

type Mutation {
  updatedItems(input: [ItemInp]): [Item]
}

type Subscription{
    feedUpdated : [Item]
}

schema {
    query: Query,
    mutation: Mutation,
    subscription: Subscription
}
`;



export default [typeDefinitions]

