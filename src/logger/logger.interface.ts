export interface CreateLoggerProvidersConfiguration {
  types: Array<'console' | 'files'>;
  directory: string;
}
