export default class Environment {
  public static readonly getDomain = (): string => {
    const HOST = process.env["HOST"] ?? 'lb-proyect-1850608966.us-east-1.elb.amazonaws.com'
    const PROTOCOL = process.env["PROTOCOL"] ?? 'http'
    return `${PROTOCOL}://${HOST}`
  }
}