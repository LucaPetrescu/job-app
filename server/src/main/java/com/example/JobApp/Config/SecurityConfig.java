package com.example.JobApp.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity security) throws Exception {
        security.httpBasic().disable();

        security.authorizeRequests()
                .antMatchers("/admin/**").hasRole("Admin")
                .antMatchers("/user/**").hasRole("User")
                .anyRequest().permitAll() // <------- Here is the change
                .and().formLogin()
                .and().csrf().disable();
    }

}