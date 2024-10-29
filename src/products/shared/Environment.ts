export default class Environment {
  public static readonly getDomain = (): string => {
    const HOST = process.env["HOST"] ?? 'ALB-PUBLIC-21587761.us-east-1.elb.amazonaws.com'
    const PROTOCOL = process.env["PROTOCOL"] ?? 'http'
    return `${PROTOCOL}://${HOST}`
  }
}