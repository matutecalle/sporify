import Album from './album'
export default class Artist {
    constructor(artistData, albumsData = []) {
        this.external_urls = artistData.external_urls.spotify;
        this.followers = artistData.followers.total;
        this.genres = artistData.genres;
        this.href = artistData.href;
        this.id = artistData.id;
        this.images = artistData.images.map(img => ({
            url: img.url,
            height: img.height,
            width: img.width
        }));
        this.name = artistData.name;
        this.popularity = artistData.popularity;
        this.uri = artistData.uri;
        this.albums = albumsData.map(album => new Album(album));
    }

    // Método para añadir más álbumes si se reciben posteriormente
    addAlbums(albumsData) {
        const newAlbums = albumsData.map(album => new Album(album));
        this.albums = [...this.albums, ...newAlbums];
    }
}