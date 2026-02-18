package com.uneg.pictorialArcane.persistence.mapper;

import com.uneg.pictorialArcane.domain.dto.request.SculptureRequestDto;
import com.uneg.pictorialArcane.domain.dto.response.SculptureResponseDto;
import com.uneg.pictorialArcane.persistence.entity.SculptureEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring") //componente para inyectar en otras clases
public interface SculptureMapper {
    SculptureResponseDto toResponseDto (SculptureEntity entity);

    SculptureEntity toEntity(SculptureRequestDto request);

    List<SculptureResponseDto> toResponseDtoList(List<SculptureEntity> entities);
}
