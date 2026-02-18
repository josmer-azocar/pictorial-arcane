package com.uneg.pictorialArcane.domain.service;

import com.uneg.pictorialArcane.domain.dto.request.SculptureRequestDto;
import com.uneg.pictorialArcane.domain.dto.response.ArtWorkResponseDto;
import com.uneg.pictorialArcane.domain.dto.response.SculptureResponseDto;
import com.uneg.pictorialArcane.persistence.crud_repository.CrudArtWorkRepository;
import com.uneg.pictorialArcane.persistence.entity.ArtWorkEntity;
import com.uneg.pictorialArcane.persistence.entity.ArtistEntity;
import com.uneg.pictorialArcane.persistence.entity.SculptureEntity;
import com.uneg.pictorialArcane.persistence.impl_repository.ArtWorkRespository;
import com.uneg.pictorialArcane.persistence.impl_repository.ArtistRepository;
import com.uneg.pictorialArcane.persistence.impl_repository.SculptureRepository;
import com.uneg.pictorialArcane.persistence.mapper.SculptureMapper;
import org.springframework.stereotype.Service;

@Service
public class SculptureService {

    private final SculptureRepository sculptureRepository;
    private final ArtWorkRespository artWorkRespository;
    private final CrudArtWorkRepository crudArtWorkRepository;
    private final ArtistRepository artistRepository;
    private final SculptureMapper sculptureMapper;

    public SculptureService(SculptureRepository sculptureRepository, ArtWorkRespository artWorkRespository, CrudArtWorkRepository crudArtWorkRepository, ArtistRepository artistRepository, SculptureMapper sculptureMapper) {
        this.sculptureRepository = sculptureRepository;
        this.artWorkRespository = artWorkRespository;
        this.crudArtWorkRepository = crudArtWorkRepository;
        this.artistRepository = artistRepository;
        this.sculptureMapper = sculptureMapper;
    }

    public SculptureResponseDto createSculpture(SculptureRequestDto sculptureRequest) {
        /**this.artWorkRespository.getArtWorkById(sculptureRequest.idArtWork());
        ArtWorkEntity artWorkEntity = this.crudArtWorkRepository.findFirstByIdArtWork(sculptureRequest.idArtWork());
        SculptureEntity sculptureEntity = this.sculptureRepository.getMapper().toEntity(sculptureRequest);
        sculptureEntity.setArtWork(artWorkEntity);
        return this.sculptureRepository.save(sculptureEntity);**/
        this.artWorkRepository.getArtWorkById(request.idArtWork());
        ArtWorkEntity artWorkBase = this.crudArtWorkRepository.findFirstByIdArtWork(request.idArtWork());
        SculptureEntity sculpture = this.sculptureRepository.getMapper().toEntity(request);
        if (artWorkBase.getArtist() != null) {
            Double artistRate = artWorkBase.getArtist().getCommissionRate();
            sculpture.setArtWorkCommission(artistRate);
        }
        sculpture.setName(artWorkBase.getName());
        sculpture.setStatus(artWorkBase.getStatus());
        sculpture.setPrize(artWorkBase.getPrize());
        sculpture.setIdArtist(artWorkBase.getIdArtist());
        return this.sculptureRepository.save(sculpture);
    }
}
