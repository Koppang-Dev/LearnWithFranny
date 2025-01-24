package com.learnwithfranny.backend.config;

import com.learnwithfranny.backend.service.UserDetailsServiceImpl;
import com.learnwithfranny.backend.service.AuthEntryPointJwt;
import com.learnwithfranny.backend.filter.AuthTokenFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



/**
 * Configuration class for setting up security configurations in the application.
 * 
 * This class includes authentication configuration, CORS handling, JWT token filters, and access rules for endpoints.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

    private UserDetailsServiceImpl userDetailsService;
    private AuthEntryPointJwt authEntryPointJwt;
    private AuthTokenFilter authTokenFilter;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler;

    
    public SecurityConfiguration(UserDetailsServiceImpl userDetailsService, AuthEntryPointJwt authEntryPointJwt, AuthTokenFilter authTokenFilter) {
        this.userDetailsService = userDetailsService;
        this.authEntryPointJwt = authEntryPointJwt;
        this.authTokenFilter = authTokenFilter;
    }

    /**
     * Bean definition for password encoder using BCrypt hashing algorithm.
     * 
     * @return PasswordEncoder to be used for password encryption
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Bean definition for authentication manager. This is needed for managing authentication
     * during user login and session creation.
     * 
     * @param authenticationConfiguration The Spring authentication configuration
     * @return AuthenticationManager instance used for authenticating users
     * @throws Exception If any error occurs during authentication manager initialization
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * Configures the AuthenticationManagerBuilder to set up custom user details service and password encoder.
     * 
     * @param authenticationManagerBuilder The builder used to configure the AuthenticationManager
     * @return The configured AuthenticationManagerBuilder
     * @throws Exception If any error occurs during configuration
     */
    @Bean
    @Primary
    public AuthenticationManagerBuilder configureAuthenticationManagerBuilder(
            AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder;
    }

    /**
     * Configures the HTTP security for the application.
     * This includes setting up CORS, disabling CSRF, configuring exception handling, and session management.
     * Additionally, it configures access control for different API endpoints.
     * 
     * @param http The HttpSecurity object used to define security configurations
     * @return The configured SecurityFilterChain that will be applied to HTTP requests
     * @throws Exception If any error occurs during HTTP security configuration
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
        .csrf(csrf -> csrf
                .ignoringRequestMatchers("/api/**", "/file/upload")
        )
        .sessionManagement(session -> session
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(authz -> authz
            .requestMatchers("/api/**", "/api/test/**", "/login/oauth2/**", "/oauth2/authorization/google", "/file/upload").permitAll()
                        .anyRequest().authenticated())
                        .exceptionHandling(exceptionHandling -> exceptionHandling
            .authenticationEntryPoint(authEntryPointJwt)  
        )
                .oauth2Login(oAuthLogin -> 
                oAuthLogin
                        .successHandler(oauth2AuthenticationSuccessHandler)
                );
                

       
        http.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
