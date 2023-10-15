export interface DockerConfig {
    file: string;
    token: string;
    volumesToConfigure: DockerConfigVolumes[] | null;
}

export interface DockerConfigVolumes {
    key: string;
    for: string;
}