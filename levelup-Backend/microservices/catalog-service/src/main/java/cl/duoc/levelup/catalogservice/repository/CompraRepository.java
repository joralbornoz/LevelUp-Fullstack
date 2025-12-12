package cl.duoc.levelup.catalogservice.repository;

import cl.duoc.levelup.catalogservice.model.Compra;
import cl.duoc.levelup.catalogservice.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompraRepository extends JpaRepository<Compra, Long> {

    List<Compra> findByUsuarioOrderByFechaDesc(Usuario usuario);

    void deleteByUsuario(Usuario usuario);
}
