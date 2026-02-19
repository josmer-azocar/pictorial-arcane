package com.uneg.pictorialArcane.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;

import java.util.List;

@Entity
@Table(name = "artist")

public class ArtistEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_artist")
    private Long idArtist;

    @Column(name = "commission_rate", nullable = false)
    @DecimalMin(value = "5.0", message = "La comisión mínima es del 5%")
    @DecimalMax(value = "10.0", message = "La comisión máxima es del 10%")
    private Double commissionRate; //la comisión puesta por el artista

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "lastName", nullable = false, length = 50)
    private String lastName;

    @Column(name = "nationality", nullable = false, length = 20)
    private String nationality;

    @Column(name = "biography", nullable = false, length = 120)
    private String biography;

    @OneToMany(mappedBy = "artist", cascade = CascadeType.ALL)
    private List<ArtWorkEntity> artWorks;

    public Long getIdArtist() {
        return idArtist;
    }

    public void setIdArtist(Long idArtist) {
        this.idArtist = idArtist;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public Double getCommissionRate() {
        return commissionRate;
    }

    public void setCommissionRate(Double commissionRate) {
        this.commissionRate = commissionRate;
    }

    public List<ArtWorkEntity> getArtWorks() {
        return artWorks;
    }

    public void setArtWorks(List<ArtWorkEntity> artWorks) {
        this.artWorks = artWorks;
    }
}
