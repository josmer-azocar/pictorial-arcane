package com.uneg.pictorialArcane.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "artwork")
@Inheritance(strategy = InheritanceType.JOINED) //para crear dos tablas separadas artwork y sculpture
public class ArtWorkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_artwork")
    private Long idArtWork;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "status", nullable = false, length = 15)
    private String status;

    @Column(name = "prize")
    private double prize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_artist", insertable = false, updatable = false)
    private ArtistEntity artist; //trae la informacion del artista solo de lectura

    @Column(name = "id_artist")
    private Long idArtist; //aqui se guarda el id del artista dentro de ArtWork

    @Column(name = "artwork_commission", nullable = false)
    private Double artWorkCommission; //sera copiado del artista al momento de crear la obra para manejar los cambios de precio

    public ArtistEntity getArtist() {
        return artist;
    }

    public void setArtist(ArtistEntity artist) {
        this.artist = artist;
    }

    public Long getIdArtist() {
        return idArtist;
    }

    public void setIdArtist(Long idArtist) {
        this.idArtist = idArtist;
    }

    public Long getIdArtWork() {
        return idArtWork;
    }

    public void setIdArtWork(Long idArtWork) {
        this.idArtWork = idArtWork;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getPrize() {
        return prize;
    }

    public void setPrize(double prize) {
        this.prize = prize;
    }

    public Double getArtWorkCommission() {
        return artWorkCommission;
    }

    public void setArtWorkCommission(Double artWorkCommission) {
        this.artWorkCommission = artWorkCommission;
    }
}
